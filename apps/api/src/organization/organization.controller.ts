import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrgDto } from './dto/create-org.dto';
import { Roles } from './decorators/roles.decorator';
import { RbacGuard } from './guards/rbac-member.guard';
import { UpdateOrgDto } from './dto/update-org.dto';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { GenericOrgDto } from './dto/generic-org.dto';

@Controller('org')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async createOrganization(@Body() createOrgDto: CreateOrgDto, @AuthUser() user: User) {
        return this.organizationService.create(createOrgDto, user.uid);
    }

    @Get('find/:slug')
    async findOrgBySlug(@Param('slug') slug: string) {
        return this.organizationService.findOrgBySlug(slug);
    }

    @Post('/update')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async updateOrganization(@Body() updateOrgDto: UpdateOrgDto) {
        return this.organizationService.update(updateOrgDto);
    }

    @Post('/member')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getMembers(@Body() orgDto: GenericOrgDto) {
        return this.organizationService.getMembers(orgDto.organizationId);
    }
}
