import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getHello(): string {
        return 'Hello World!';
    }
}
