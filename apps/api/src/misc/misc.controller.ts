import { Controller, Get, Query } from '@nestjs/common';
import { MiscService } from './misc.service';

@Controller()
export class MiscController {
    constructor(private readonly miscService: MiscService) {}

    @Get('tags')
    async getCollegeName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.miscService.getTagName(search, limit, page);
    }
}
