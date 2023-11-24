import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { OrganizationService } from 'src/organization/organization.service';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly userService: UserService,
    ) {}

    @Get('/orgs')
    @UseGuards(AuthGuard('jwt'))
    async findOrgs(@AuthUser() user: User) {
        return this.organizationService.findOrgsByUser(user.uid);
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@AuthUser() user: User) {
        return this.userService.findUserById(user.uid);
    }

    @Patch('/')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Body() updateUserDto: UpdateUserDto, @AuthUser() user: User) {
        return this.userService.updateUser(user, updateUserDto);
    }

    @Get('/tickets')
    @UseGuards(AuthGuard('jwt'))
    async getUserTickets(@AuthUser() user: User) {
        return this.userService.getReservedTickets(user.uid);
    }
}
