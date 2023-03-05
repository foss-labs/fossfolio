import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileService } from './profile.service';
import { ReadException } from './exception/read.exception';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async read(@Session() session: SessionContainer) {
        let authId: string;
        try {
            authId = session.getUserId();
            return await this.profileService.read(authId);
        } catch (err) {
            throw new ReadException(err);
        }
    }
}
