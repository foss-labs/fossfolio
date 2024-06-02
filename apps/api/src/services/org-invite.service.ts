import { PrismaService } from './prisma.service';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { Role } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import BaseContext from '@api/BaseContext';

@Injectable()
export class OrganizationInviteService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly configService: ConfigService,
	) {}

	async inviteToOrg(
		email: string,
		inviterid: string,
		orgId: string,
		role: Role,
	) {
		try {
			// if there is already invite
			const isAlreadySent =
				await this.prismaService.organizationInvite.findUnique({
					where: {
						inviteeEmail_organizationId: {
							inviteeEmail: email,
							organizationId: orgId,
						},
					},
					select: {
						id: true,
					},
				});
			// if user already exist in db
			// delete the already existing invite
			if (isAlreadySent) {
				await this.prismaService.organizationInvite.delete({
					where: {
						inviteeEmail_organizationId: {
							organizationId: orgId,
							inviteeEmail: email,
						},
					},
				});
			}

			// transaction
			const inviteUrl = await this.prismaService.$transaction(async (db) => {
				const data = await db.organization.update({
					where: {
						id: orgId,
					},
					data: {
						invites: {
							create: {
								inviteeEmail: email,
								inviterUid: inviterid,
								inviteeRole: role,
							},
						},
					},
					include: {
						invites: true,
					},
				});
				// the guy who send invite
				const inviter = await db.user.findUnique({
					where: {
						uid: inviterid,
					},
				});
				const inviteId = data.invites.find(
					(el) => el.inviteeEmail === email,
				).id;
				//  finding the id of new invite
				const localPort =
					this.configService.get('CLIENT_URL') || 'http://localhost:3000';
				const inviteURL = `${localPort}/verify?id=${inviteId}`;

				// we dont want to send invite on local
				// @sreehari2003 Removing this for presentation
				// if (process.env.NODE_ENV === 'production') {
				await this.eventEmitter.emit('org.invite', {
					to: email,
					inviteUrl: inviteURL,
					from: inviter.displayName,
					orgName: data.name,
					fromEmail: inviter.email,
				});
				// }

				return inviteURL;
			});

			return {
				ok: true,
				data:
					this.configService.get('NODE_ENV') !== 'production'
						? inviteUrl
						: null,
				message: 'email sent successfully , please check your mailbox',
			};
		} catch {
			return {
				ok: false,
				message: 'email sending failed, please try again later',
			};
		}
	}

	async verifyEmailInvite(id: string, ownerId: string, authUserEmail: string) {
		// TODO
		// convert to transaction
		try {
			const data =
				await this.prismaService.organizationInvite.findUniqueOrThrow({
					where: {
						id: id,
					},
				});
			if (data.inviteeEmail !== authUserEmail) {
				throw new ServiceUnavailableException();
			}
			const orgData = await this.prismaService.organization.update({
				where: {
					id: data.organizationId,
				},
				data: {
					members: {
						create: {
							role: data.inviteeRole,
							userUid: ownerId,
						},
					},
				},
			});
			await this.prismaService.organizationInvite.delete({
				where: {
					id: id,
				},
			});
			if (orgData) {
				return {
					ok: true,
					message: 'invite verifcation successfull',
					data: orgData,
				};
			}
			throw new Error();
		} catch (e) {
			if (e instanceof ServiceUnavailableException) {
				throw new ServiceUnavailableException();
			}
			return {
				ok: false,
				message: 'couldnt verify the invite',
			};
		}
	}
}
