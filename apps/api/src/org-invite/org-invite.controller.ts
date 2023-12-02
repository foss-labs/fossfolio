import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RbacGuard } from '../organization/guards/rbac-member.guard';
import { Roles } from '../organization/decorators/roles.decorator';
import { OrganizationInviteService } from './org-invite.service';
import { AuthUser } from '../auth/decorators/user.decorator';
import { OrgInvie } from './dto/user-invite.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('org/invite')
export class OrgInviteController {
    constructor(private readonly service: OrganizationInviteService) {}

    @Post('/')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async sendInvite(@AuthUser() user: User, @Body() data: OrgInvie) {
        return this.service.inviteToOrg(data.email, user.uid, data.organizationId, data.role);
    }

    @Get('/verify')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async verfyEmail(@AuthUser() user: User, @Query() { id }) {
        return this.service.verifyEmailInvite(id, user.uid);
    }
}
