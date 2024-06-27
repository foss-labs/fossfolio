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
import { User } from '@api/db/schema';

@Injectable()
export class OrganizationService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createOrgDto: CreateOrgDto, user: User) {
		const org = await OrgModel.insert({
			...createOrgDto,
			slug: hyphenate(createOrgDto.slug),
		});

		await OrgMemberModel.insert({
			fk_organization_id: org.id,
			fk_user_id: user.id,
			role: Role.ADMIN,
		});

		return org;
	}

	async findOrgBySlug(slug: string) {

		const org = await OrgModel.findOne({
			slug: hyphenate(slug)
		})

		if(!org) FFError.notFound('Organization Not Found')

		return org
	}

	async deleteOrg(id: string) {
		await OrgMemberModel.delete({
			fk_organization_id: id,
		});

		// TODO - Delete Events in the org

		return await OrgModel.delete({
			id,
		});
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

				return await OrgModel.delete({
					id: orgId,
				});
			}
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
					const member = await OrgMemberModel.getMemberWhoWasFirstAdded(orgId);

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
		const event = await EventModel.find({
			fk_organization_id: orgId,
		});

		// @sreehari2003 Why sending role here?
		const role = await OrgMemberModel.getMemberRole(userId, orgId);

		return {
			event,
			role,
		};
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
