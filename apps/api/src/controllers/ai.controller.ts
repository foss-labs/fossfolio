import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from '../services/ai.service';
import { ZodValidator } from '@api/validation/zod.validation.decorator';
import { AIFormSchema, AIFormDto } from '@api/dto/ai.dto';

@Controller('ai')
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@Post('form')
	@ZodValidator({
		body: AIFormSchema,
	})
	async generateForm(@Body() aiFormDto: AIFormDto) {
		return this.aiService.gptComplete(aiFormDto.prompt, aiFormDto.messages);
	}
}
