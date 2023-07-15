import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

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

        const organizationId = request.body.organizationId;

        const organizationMember = await this.prisma.organizationMember.findFirst({
            where: {
                userUid: user.uid,
                organizationId,
            },
        });

        if (!organizationMember) {
            return false;
        }

        return roles.includes(organizationMember.role);
    }
}
