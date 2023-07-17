import { IsNotEmpty, IsString } from 'class-validator';

export class GenericOrgDto {
    @IsString()
    @IsNotEmpty()
    organizationId: string;
}
