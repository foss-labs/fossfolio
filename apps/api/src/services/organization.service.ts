import { Role } from '@api/utils/db';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ORG_NOT_FOUND } from '../error';
import type { CreateOrgDto } from './dto/create-org.dto';
import { EventModel, OrgMemberModel, OrgModel } from '@api/models';
import { FFError } from '@api/utils/error';
import { hyphenate } from '@api/utils/hyphenate';

@Injectable()
export class OrganizationService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createOrgDto: CreateOrgDto, uid: string) {
		try {
			let { name, slug } = createOrgDto;

			slug = hyphenate(slug);

			const newOrg = await OrgModel.insert({
				name,
				slug,
			});

			await OrgMemberModel.insert({
				fk_organization_id: newOrg.id,
				fk_user_id: uid,
				role: Role.ADMIN,
			});

			return await OrgModel.findOne({
				id: newOrg.id,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException({
				message: error,
			});
		}
	}

	async findOrgBySlug(slug: string) {
		const org = await OrgModel.checkIfOrgWithSlugExist(slug);

		if (org.length) return org;
		return ORG_NOT_FOUND;
	}

	async deleteOrg(id: string) {
		await OrgMemberModel.delete({
			fk_organization_id: id,
		});

		// TODO - Delete Events in the org

		await OrgModel.delete({
			id,
		});
		return {
			ok: true,
			message: 'org was deleted successfully',
		};
	}

	async leaveOrg(orgId: string, userId: string) {
		try {
			const OrgMemberCount = await OrgMemberModel.count({
				fk_organization_id: orgId,
			});
			// If the person is the last person to leave the org we should delete the org completely
			if (OrgMemberCount === 1) {
				await OrgMemberModel.delete({
					fk_organization_id: orgId,
					fk_user_id: userId,
				});

				await OrgModel.delete({
					id: orgId,
				});
			} else {
				const userRole = await OrgMemberModel.findOne({
					fk_organization_id: orgId,
					fk_user_id: userId,
				}).then((el) => el?.role);

				if (userRole !== Role.ADMIN) {
					await OrgMemberModel.delete({
						fk_organization_id: orgId,
						fk_user_id: userId,
					});
				} else {
					// If there is multiple admins just make user leave the org
					const totalNumberOfAdmins = await OrgMemberModel.count({
						fk_organization_id: orgId,
						role: Role.ADMIN,
					});

					if (totalNumberOfAdmins > 1) {
						await OrgMemberModel.delete({
							fk_organization_id: orgId,
							fk_user_id: userId,
						});
					} else {
						// if there is only one admin and he is the one leaving the org we should transfer
						// the org to the first person who joined the org
						const member =
							await OrgMemberModel.getMemberWhoWasFirstAdded(orgId);

						await OrgMemberModel.update(
							{
								fk_organization_id: orgId,
								fk_user_id: member,
							},
							{
								role: Role.ADMIN,
							},
						);

						await OrgMemberModel.delete({
							fk_organization_id: orgId,
							fk_user_id: userId,
						});
					}
				}
			}

			return {
				ok: true,
				message: 'successfully left the organization',
			};
		} catch {
			return {
				ok: false,
				message: 'Unable to leave the org please try again later',
			};
		}
	}

	async getAllEvents(userId: string, orgId: string) {
		try {
			const event = await EventModel.find({
				fk_organization_id: orgId,
			});

			const role = await OrgMemberModel.getMemberRole(userId, orgId);

			return {
				event,
				role,
			};
		} catch (e) {
			return {
				ok: false,
				message: 'could not find the events',
				ERROR: e,
			};
		}
	}

	async getOrgById(orgId: string) {
		return await OrgModel.findById(orgId);
	}

	async UpdateOrg(id: string, payload: Data) {
		try {
			if (payload.slug) {
				const takenSlugs = await this.findOrgBySlug(payload.slug);
				if (Array.isArray(takenSlugs) && takenSlugs.length) {
					throw new ServiceUnavailableException();
				}
			}

			await OrgModel.update(
				{
					id,
				},
				{
					slug: payload.slug,
					name: payload.name,
				},
			);

			return {
				ok: true,
				message: 'Org was updated successfully',
			};
		} catch (e) {
			if (e instanceof ServiceUnavailableException) {
				throw new ServiceUnavailableException({
					message: 'Slug already taken',
				});
			}

			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
		}
	}

	async getEventsByorg(key: string) {
		try {
			const data = await this.prismaService.organization.findUnique({
				where: {
					slug: key,
				},
				select: {
					events: {
						where: {
							isPublished: true,
						},
					},
					name: true,
				},
			});
			if (!data) throw new NotFoundException();
			return {
				ok: true,
				message: 'Events found successfully',
				data,
			};
		} catch {
			throw new NotFoundException();
		}
	}
}

type Data = {
	slug: string;
	name: string;
};
