import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationInviteService } from './org-invite.service';
import { Roles } from '../organization/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { OrgInvie } from './dto/user-invite.dto';
import { User } from '@prisma/client';

@Controller('org/invite')
@Roles('ADMIN')
export class OrgInviteController {
    constructor(private readonly service: OrganizationInviteService) {}

    @Post('/')
    async sendInvite(@AuthUser() user: User, @Body() data: OrgInvie) {
        this.service.inviteToOrg(data.email, user.uid, data.organizationId, data.role);
    }
}
