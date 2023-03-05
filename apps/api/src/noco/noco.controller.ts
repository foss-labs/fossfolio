import { Controller, Get, Query } from '@nestjs/common';
import { NocoService } from './noco.service';

@Controller('noco')
export class NocoController {
    constructor(private readonly nocoService: NocoService) {}

    @Get('tags')
    async getCollegeName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.nocoService.getTagName(search, limit, page);
    }

    @Get('skills')
    async getSkillName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.nocoService.getTagName(search, limit, page);
    }

    @Get('sponsors')
    async getSponsorName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.nocoService.getSponsorName(search, limit, page);
    }
}
