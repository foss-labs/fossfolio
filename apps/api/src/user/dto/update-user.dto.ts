import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    uid: string;

    @IsString()
    displayName?: string;

    @IsString()
    @IsNotEmpty()
    slug?: string;

    photoUrl?: string;
}
