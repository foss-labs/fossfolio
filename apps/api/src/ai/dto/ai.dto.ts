import { ApiProperty } from '@nestjs/swagger';

export class AIFormDto {
    @ApiProperty()
    prompt: string;

    @ApiProperty()
    messages: Array<{
        text: string;
        ai: boolean;
    }>
}
