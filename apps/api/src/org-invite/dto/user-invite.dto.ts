import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrgInvie {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        enum: Role
    })
    @IsNotEmpty()
    role: Role;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    organizationId: string;
}
