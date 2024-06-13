import { Injectable, NotFoundException } from '@nestjs/common';
import { ORG_MEMBER_NOT_FOUND, ROLE_UPDATE_FAILED } from '../error';
import { PrismaService } from './prisma.service';
import { Role } from '@api/utils/db';
import { FFError } from '@api/utils/error';
import { OrgMemberModel } from '@api/models';

@Injectable()
export class OrganizationMemberService {
	constructor(private readonly prismaService: PrismaService) {}

	async getMembers(organizationId: string) {
		try {
			const data = await OrgMemberModel.getOrgMembersWithInfo(organizationId);
			if (!data) throw new NotFoundException();
			return data;
		} catch (e) {
			FFError.notFound(e);
		}
	}

	async findMember(organizationId: string, userUid: string) {
		const member = await this.prismaService.organizationMember.findUnique({
			where: {
				userUid_organizationId: {
					userUid,
					organizationId,
				},
			},
		});

		if (member) return member;
		return ORG_MEMBER_NOT_FOUND;
	}

	async removeMember(organizationId: string, userUid: string) {
		try {
			const member = await this.prismaService.organizationMember.findUnique({
				where: {
					userUid_organizationId: {
						userUid,
						organizationId,
					},
				},
			});

			if (!member) throw new NotFoundException();

			await this.prismaService.organizationMember.delete({
				where: {
					id: member.id,
				},
			});

			return {
				ok: true,
				message: 'User removed successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException({
					ORG_MEMBER_NOT_FOUND,
				});
			}
			return e;
		}
	}

	async updateRole(organizationId: string, userUid: string, role: Role) {
		try {
			const newRole = await this.prismaService.organizationMember.update({
				where: {
					userUid_organizationId: {
						userUid,
						organizationId,
					},
				},
				data: {
					role,
				},
			});

			if (!newRole) throw new NotFoundException();

			return {
				ok: true,
				message: 'role updated successfully',
				data: newRole,
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException({
					ROLE_UPDATE_FAILED,
				});
			}
			return e;
		}
	}
}
