import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ORG_ID_NOT_FOUND, NO_ROLE_ACCESS } from '../../error';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const organizationId =
            request.method === 'GET' ? request.params.orgID : request.body.organizationId;

        if (!organizationId) {
            throw new NotFoundException(ORG_ID_NOT_FOUND);
        }

        const organizationMember = await this.prisma.organizationMember.findUnique({
            where: {
                userUid_organizationId: {
                    userUid: user.uid,
                    organizationId,
                },
            },
        });

        if (!organizationMember) {
            throw new ForbiddenException(NO_ROLE_ACCESS);
        }

        // setting role in request so that we can access the role via decorator
        request.role = organizationMember.role;

        return roles.includes(organizationMember.role);
    }
}
