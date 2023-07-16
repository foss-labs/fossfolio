import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { OrganizationService } from 'src/organization/organization.service';

@Controller('user')
export class UserController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get('orgs')
    @UseGuards(AuthGuard('jwt'))
    async findOrgs(@AuthUser() user: User) {
        return this.organizationService.findOrgsByUser(user.uid);
    }
}
