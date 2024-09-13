import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Role } from '@prisma/client';

export const UserRole = createParamDecorator(
	(_, ctx: ExecutionContext): Role => {
		const request = ctx.switchToHttp().getRequest();

		return request.role;
	},
);
