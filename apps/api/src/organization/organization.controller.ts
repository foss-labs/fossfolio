import { Body, Controller, Get, Param, Patch, Post, UseGuards, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrgDto } from './dto/create-org.dto';
import { DeleteOrgDto } from './dto/delete-org.dto';
import { Roles } from './decorators/roles.decorator';
import { RbacGuard } from './guards/rbac-member.guard';
import { UpdateOrgDto } from './dto/update-org.dto';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User, Role } from '@prisma/client';
import { LeaveOrg } from './dto/leave-org.dto';
import { UserRole } from 'src/auth/decorators/role.decorator';

@Controller('org')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async createOrganization(@Body() createOrgDto: CreateOrgDto, @AuthUser() user: User) {
        return this.organizationService.create(createOrgDto, user.uid);
    }

    @Get('/find/:slug')
    async findOrgBySlug(@Param('slug') slug: string) {
        return this.organizationService.findOrgBySlug(slug);
    }

    @Get('/events/:orgID')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getAllEvents(@Param('orgID') orgID: string, @UserRole() role: Role) {
        return this.organizationService.getAllEvents(orgID, role);
    }

    @Patch('/')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async updateOrganization(@Body() updateOrgDto: UpdateOrgDto) {
        return this.organizationService.update(updateOrgDto);
    }

    @Delete('/delete')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async deleteOrganization(@Body() data: DeleteOrgDto) {
        return this.organizationService.deleteOrg(data.organizationId);
    }
    @Delete('/leave')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async leaveOrg(@AuthUser() user: User, @Body() body: LeaveOrg) {
        return this.organizationService.leaveOrg(body.organizationId, user.uid);
    }
}
