import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
    @Get()
    getTest() {
        return {
            ok: true,
            message: 'Server running successfully',
        };
    }
}
