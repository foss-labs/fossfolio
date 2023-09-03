import { Body, Controller, Get, Param, Patch, Post, UseGuards, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrgDto } from './dto/create-org.dto';
import { DeleteOrgDto } from './dto/delete-org.dto';
import { Roles } from './decorators/roles.decorator';
import { RbacGuard } from './guards/rbac-member.guard';
import { UpdateOrgDto } from './dto/update-org.dto';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

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
}
