import { Resend } from 'resend';
import { InviteUserEmail } from './templates/Orginvite';
const resend = new Resend('re_123456789');

export type IData = {
    inviteId: string;
    from: string;
    orgName: string;
    fromEmail: string;
};

export const sendInvite = async (to: string, data: IData): Promise<boolean> => {
    try {
        await resend.emails.send({
            from: 'Sreehari <sreeharivijaya2003@gmail.com>',
            to: [to],
            subject: 'You have been invited to Join Fossfolio',
            react: InviteUserEmail({
                from: data.from,
                orgName: data.orgName,
                inviteId: data.inviteId,
                fromEmail: data.fromEmail,
            }),
        });
        return true;
    } catch {
        return false;
    }
};
