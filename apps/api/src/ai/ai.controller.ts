import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { AIFormDto } from './dto/ai.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}
    @Post('form')
    @ApiTags('ai')

    async generateForm(@Body() aiFormDto: AIFormDto) {
        return this.aiService.gptComplete(aiFormDto.prompt, aiFormDto.messages);
    }
}
