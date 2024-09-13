import { User as FFUser } from '@api/db/schema';
import { Role } from '@api/utils/db';

declare namespace Express {
	export interface Request {
		user?: FFUser;
		role?: Role;
	}
}
