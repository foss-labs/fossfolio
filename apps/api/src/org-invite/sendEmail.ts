import { Resend } from 'resend';
import { InviteUserEmail } from './templates/Orginvite';

const resend = new Resend(process.env.RESEND_KEY);

export type IData = {
    inviteUrl: string;
    from: string;
    orgName: string;
    fromEmail: string;
};

export const sendInvite = async (to: string, data: IData): Promise<boolean> => {
    try {
        const res = await resend.emails.send({
            from: 'Sreehari <sreeharivijaya2003@gmail.com>',
            to: [to],
            subject: 'You have been invited to Join Fossfolio',
            text: `
               you have been invited to ${data.orgName} a organization in Fossfolio 
               by ${data.from}(${data.fromEmail}) please click following link to accept the 
               invite ${data.inviteUrl}
            
            `,
        });
        return true;
    } catch {
        return false;
    }
};
