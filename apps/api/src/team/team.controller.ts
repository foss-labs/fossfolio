import { SessionContainer } from 'supertokens-node/recipe/session';
import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { ReadException } from './exception/read.exception';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateException } from './exception/create.exception';
import { Session } from '../auth/session.decorator';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    @UseGuards(new AuthGuard())
    create(@Session() session: SessionContainer, @Body() createTeamDto: CreateTeamDto) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.create(createTeamDto, authId);
        } catch (err) {
            return new CreateException(err);
        }
    }

    @Get(':eventId')
    @UseGuards(new AuthGuard())
    get(@Session() session: SessionContainer, @Param('eventId') eventId: string) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.read(eventId, authId);
        } catch (err) {
            return new ReadException(err);
        }
    }
}
