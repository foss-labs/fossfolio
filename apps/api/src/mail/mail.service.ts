import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    @OnEvent('org.invite')
    async onOrgInvite(payload: OrgInviteEvent) {
        await this.mailerService.sendMail({
            to: payload.to,
            subject: `You have been invited to Join ${payload.orgName}`,
            template: 'org-invite',
            context: {
                from: payload.from,
                fromEmail: payload.fromEmail,
                orgName: payload.orgName,
                inviteUrl: payload.inviteUrl,
            },
        });
    }

    @OnEvent('user.registered')
    async onUserRegistered(payload: UserRegisteredEvent) {
        await this.mailerService.sendMail({
            to: payload.email,
            subject: 'Welcome to Fossfolio',
            template: 'welcome',
            context: {
                name: payload.name,
                email: payload.email,
                avatarUrl: payload.avatarUrl,
            },
        });
    }
}

export interface OrgInviteEvent {
    inviteUrl: string;
    from: string;
    orgName: string;
    fromEmail: string;
    to: string;
}

export interface UserRegisteredEvent {
    email: string;
    name: string;
    avatarUrl: string;
}