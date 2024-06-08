import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberRole {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    organizationId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    memberId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role: string;
}
