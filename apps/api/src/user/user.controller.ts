import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UserService } from './user.service';
import { ReadUserException } from './exception/read-user.exception';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async read(@Session() session: SessionContainer) {
        let authId: string;
        try {
            authId = await session.getUserId();
            return await this.userService.read(authId);
        } catch (error) {
            throw new ReadUserException(error);
        }
    }
}
