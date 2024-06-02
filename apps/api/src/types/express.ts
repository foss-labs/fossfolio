import type { User } from '@api/db/schema';

declare namespace Express {
	export interface Request {
		user: User;
	}
}
