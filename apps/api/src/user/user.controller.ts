import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { OrganizationService } from 'src/organization/organization.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly userService: UserService,
    ) {}

    @Get('orgs')
    @UseGuards(AuthGuard('jwt'))
    async findOrgs(@AuthUser() user: User) {
        return this.organizationService.findOrgsByUser(user.uid);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getUser(@AuthUser() user: User) {
        return this.userService.findUserById(user.uid);
    }
}
