import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrgDto {
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
