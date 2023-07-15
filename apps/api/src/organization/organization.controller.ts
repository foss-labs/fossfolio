import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrgDto } from './dto/create-org.dto';

@Controller('org')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async createOrganization(@Body() createOrgDto: CreateOrgDto, @Request() req) {
        const uid = req.user.uid;
        return this.organizationService.create(createOrgDto, uid);
    }

    @Get(':slug')
    async findOrgBySlug(@Param('slug') slug: string) {
        return this.organizationService.findOrgBySlug(slug);
    }
}
