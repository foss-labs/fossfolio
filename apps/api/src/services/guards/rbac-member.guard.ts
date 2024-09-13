import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NO_ROLE_ACCESS } from '../../error';
import { FFError } from '@api/utils/error';
import { OrgMemberModel } from '@api/models';
import { User } from '@api/db/schema';
import { Request } from 'express';
import { Role } from '@api/utils/db';

@Injectable()
export class RbacGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		const request: IncomingRequest = context.switchToHttp().getRequest();
		const user = request.user as User | undefined;
		const organizationId = request.params.orgId;

		if (!organizationId || !user) {
			FFError.forbidden('');
		}

		const organizationMember = await OrgMemberModel.findOne({
			fk_organization_id: organizationId,
			fk_user_id: user.id,
		});

		if (!organizationMember) {
			throw new ForbiddenException(NO_ROLE_ACCESS);
		}
		request.role = organizationMember.role;

		return roles.includes(organizationMember.role);
	}
}

interface IncomingRequest extends Request {
	role: Role;
}
