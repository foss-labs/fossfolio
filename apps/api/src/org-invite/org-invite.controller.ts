import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrganizationInviteService } from './org-invite.service';
import { Roles } from '../organization/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { OrgInvie } from './dto/user-invite.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';

@Controller('org/invite')
@Roles('ADMIN')
export class OrgInviteController {
    constructor(private readonly service: OrganizationInviteService) {}

    @Post('/')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async sendInvite(@AuthUser() user: User, @Body() data: OrgInvie) {
        return this.service.inviteToOrg(data.email, user.uid, data.organizationId, data.role);
    }
}
