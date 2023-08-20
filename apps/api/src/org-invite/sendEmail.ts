import { Resend } from 'resend';
const resend = new Resend('re_123456789');

type IData = {
    to: string;
    html: string;
};

export const sendEmail = async ({ to, html }: IData): Promise<boolean> => {
    try {
        await resend.emails.send({
            from: 'Sreehari <sreeharivijaya2003@gmail.com>',
            to: [to],
            subject: 'You have been invited to Join Fossfolio',
            html: html,
        });
        return true;
    } catch {
        return false;
    }
};
