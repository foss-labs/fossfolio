import { Resend } from 'resend';
import { InviteUserEmail } from './templates/Orginvite';
const resend = new Resend('re_123456789');

type IData = {
    to: string;
};

export const sendInvite = async (to:string): Promise<boolean> => {
    try {
        await resend.emails.send({
            from: 'Sreehari <sreeharivijaya2003@gmail.com>',
            to: [to],
            subject: 'You have been invited to Join Fossfolio',
            react: <InviteUserEmail />,
        });
        return true;
    } catch {
        return false;
    }
};
