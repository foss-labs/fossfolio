import { Response } from 'express';

export const cookieHandler = (
    res: Response,
    authToken: {
        accessToken: string;
        refreshToken: string;
    },
    redirect?: boolean,
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

    if (!redirect) {
        return res.status(200).json({
            message: 'Success',
        });
    }

    return res.status(200).redirect(process.env.CLIENT_REDIRECT_URI);
};
