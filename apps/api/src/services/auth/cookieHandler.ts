import type { Response } from 'express';

import BaseContext from '@api/BaseContext';

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
		secure: BaseContext.config.get('NODE_ENV') === 'production',
		maxAge: 1000 * 60 * 60 * 24, // 1 day
	});
	res.cookie('refresh_token', authToken.refreshToken, {
		httpOnly: true,
		secure: BaseContext.config.get('NODE_ENV') === 'production',
		maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
	});

	if (!redirect) {
		return res.status(200).json({
			message: 'Success',
		});
	}

	return res
		.status(200)
		.redirect(<string>BaseContext.config.get('CLIENT_REDIRECT_URI'));
};
