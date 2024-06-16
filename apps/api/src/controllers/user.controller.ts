import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { User } from '@api/db/schema';
import type { UpdateUserDto } from '../services/dto/update-user.dto';
import { OrgModel } from '@api/models';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
	constructor(
		private readonly organizationService: OrganizationService,
		private readonly userService: UserService,
	) {}

	@Get('/orgs')
	@UseGuards(AuthGuard('jwt'))
	async findOrgs(@AuthUser() user: User) {
		return OrgModel.getOrgsWithUserAsMember(user.id);
	}

	@Get('/')
	@UseGuards(AuthGuard('jwt'))
	async getUser(@AuthUser() user: User) {
		return this.userService.findUserById(user.id);
	}

	@Patch('/')
	@UseGuards(AuthGuard('jwt'))
	async updateUser(
		@Body() updateUserDto: UpdateUserDto,
		@AuthUser() user: User,
	) {
		return this.userService.updateUser(user, updateUserDto);
	}

	@Get('/tickets')
	@UseGuards(AuthGuard('jwt'))
	async getUserTickets(@AuthUser() user: User) {
		return this.userService.getReservedTickets(user.id);
	}
}
