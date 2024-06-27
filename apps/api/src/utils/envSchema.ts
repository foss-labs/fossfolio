import { z } from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z
		.string({
			required_error: 'DATABASE_URL is required in the environment variables',
		})
		.default('postgres://fossfolio:fossfolio@localhost:5432/fossfolio'),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	GITHUB_CALLBACK_URL: z.string().url(),
	GITHUB_SCOPE: z.string().default('user:email'),
	ACCESS_TOKEN_VALIDITY: z.string().default('10h'),
	API_BASE_URL: z.string().default('http://localhost:8000'),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_CALLBACK_URL: z.string().url(),
	GOOGLE_SCOPE: z.string().default('profile,email'),

	WEB_URL: z.string().default('http://localhost:3000'),

	MAIL_HOST: z.string(),
	MAIL_PORT: z.string().default('587'),
	MAIL_USER: z.string(),
	MAIL_PASSWORD: z.string(),

	AWS_ACCESS_KEY: z.string(),
	AWS_SECRET_KEY: z.string(),
	AWS_REGION: z.string(),

	STRIPE_SECRET_KEY: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),

	JWT_SECRET: z.string(),

	AI_KEY: z.string(),

	NODE_ENV: z.string().default('development'),

	HOST: z.string().default('0.0.0.0'),
	PORT: z
		.string()
		.refine(
			(v) => {
				const n = Number(v);
				return !Number.isNaN(n) && v?.length > 0;
			},
			{ message: 'Invalid PORT number' },
		)
		.default('8080'),

	DB_HOST: z.string().default('localhost'),
	DB_USER: z.string().default('fossfolio'),
	DB_PASSWORD: z.string().default('fossfolio'),
	DB_NAME: z.string().default('fossfolio'),
	DB_PORT: z.string().default('5432'),
});
