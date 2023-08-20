import { Controller, Post } from '@nestjs/common';
import { OrganizationInviteService } from './org-invite.service';
import { Roles } from '../organization/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('org/invite')
@Roles('ADMIN')
export class OrgInviteController {
    constructor(private readonly service: OrganizationInviteService) {}

    @Post('/')
    async sendInvite(@AuthUser() user: User) {
        this.service.inviteToOrg();
    }
}
