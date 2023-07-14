import { Response } from 'express';

export const cookieHandler = (
    res: Response,
    authToken: {
        accessToken: string;
        refreshToken: string;
    },
) => {
    res.cookie('access_token', authToken.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.cookie('refresh_token', authToken.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 6, // 6 hours
    });

    res.status(200).redirect(process.env.CLIENT_REDIRECT_URI);
};
