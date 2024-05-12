import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class ToggleFormPublishStatus {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    shouldFormPublish: boolean;
}
