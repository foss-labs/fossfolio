import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { TeamCreatedEvent } from './events/team-created-event';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateException } from './exception/create.exception';

interface Resp {
    message: string;
    data?: any;
}

@Injectable()
export class TeamService {
    constructor(
        private readonly prisma: PrismaService,
        // private eventEmitter: EventEmitter2,
        private mailService: MailService,
    ) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async create(createTeamDto: CreateTeamDto, authid: string) {
        const { eventId, name, repo } = createTeamDto;
        const { data } = await this.read(eventId, authid);
        if (data != null) {
            return new CreateException('User already in a Team');
        }
        const res = await this.prisma.team.create({
            data: {
                name,
                repo,
                eventId,
                members: {
                    create: {
                        role: Role.LEADER,
                        userId: authid,
                        eventId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                repo: true,
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                email: true,
                                name: true,
                                githubID: true,
                            },
                        },
                    },
                },
            },
        });

        /* const members = await Promise.all(
            createTeamDto.members.map(async (member) => {
                const user = await this.prisma.user.findUnique({
                    where: {
                        githubID: member,
                    },
                });
                
            }),
        ); */

        // this.eventEmitter.emit('team.create', new TeamCreatedEvent(res.id, members));
        return this.Success({
            message: 'Team created successfully',
            data: res,
        });
    }

    async read(eventId: string, authid: string) {
        const data = await this.prisma.teamMember.findFirst({
            where: {
                userId: authid,
                eventId,
            },
            select: {
                team: {
                    select: {
                        id: true,
                        name: true,
                        repo: true,
                        members: {
                            select: {
                                role: true,
                                user: {
                                    select: {
                                        githubID: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return this.Success({
            message: 'Team Read successfully',
            data,
        });
    }

    async findOne(teamId: string) {
        const data = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                id: true,
                name: true,
                repo: true,
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                id: true,
                                githubID: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return this.Success({
            message: 'Team Read successfully',
            data: typeof data === 'undefined' ? null : data,
        });
    }

    @OnEvent('team.create')
    async onTeamCreate(event: TeamCreatedEvent) {
        const { teamId, members } = event;
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
        });
        if (team == null) {
            return;
        }
        members.forEach(async (member) => {
            if (member.role === 'LEADER') {
                const data = {
                    teamID: team.id,
                };
                await this.mailService.sendTeamCreated({
                    data,
                    email: member.user.email,
                });
            } else {
                const data = {
                    lead: members.find((mem) => mem.role === 'LEADER')?.user.name || '',
                    teamName: team.name,
                    teamID: teamId,
                    inviteCode: member.user.inviteCode,
                };
                await this.mailService.sendMemberInvited({
                    data,
                    email: member.user.email,
                });
            }
        });
    }
}
