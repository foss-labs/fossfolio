import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    uid: string;

    @IsString()
    displayName?: string;

    @IsString()
    slug?: string;

    @IsNotEmpty()
    @IsUrl()
    photoUrl?: string;
}
