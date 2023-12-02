import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    @OnEvent('org.invite')
    async onOrgInvite(payload: OrgInviteEvent) {
        await this.mailerService.sendMail({
            to: payload.to,
            subject: `You have been invited to Join ${payload.orgName}}`,
            template: 'org-invite',
            context: {
                from: payload.from,
                fromEmail: payload.fromEmail,
                orgName: payload.orgName,
                inviteUrl: payload.inviteUrl
            }
        })
    }


}


export interface OrgInviteEvent{
    inviteUrl: string;
    from: string;
    orgName: string;
    fromEmail: string;
    to: string
}
 