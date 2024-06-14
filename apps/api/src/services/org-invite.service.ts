import { PrismaService } from './prisma.service';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { OrgInviteModel, OrgModel, UserModel } from '@api/models';
import BaseContext from '@api/BaseContext';

@Injectable()
export class OrganizationInviteService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly configService: ConfigService,
	) {}

	async inviteToOrg({ email, userId, role, orgId }) {
		try {
			// if there is already invite
			const isAlreadySent = await OrgInviteModel.findOne({
				invitee_email: email,
				fk_organization_id: orgId,
			}).then((el) => el?.id);

			// if user already exist in db
			// delete the already existing invite
			if (isAlreadySent) {
				await OrgInviteModel.delete({
					fk_organization_id: orgId,
					invitee_email: email,
				});
			}
			let inviteUrl;
			// transaction
			await BaseContext.knex.transaction(async (tx) => {
				const inviteId = await OrgInviteModel.insert(
					{
						invitee_email: email,
						inviter_uid: userId,
						role: role,
						fk_organization_id: orgId,
					},
					tx,
				).then((el) => el.id);

				const org = await OrgModel.findOne({
					id: orgId,
				});

				const senderInfo = await UserModel.findOne({
					id: userId,
				});

				//  finding the id of new invite
				const localPort =
					this.configService.get('CLIENT_URL') || 'http://localhost:3000';
				inviteUrl = `${localPort}/verify?id=${inviteId}`;

				if (process.env.NODE_ENV === 'production') {
					await this.eventEmitter.emit('org.invite', {
						to: email,
						inviteUrl: inviteUrl,
						from: senderInfo?.display_name,
						orgName: org?.name,
						fromEmail: senderInfo?.email,
					});
				}
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
