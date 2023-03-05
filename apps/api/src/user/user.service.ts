import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async read(authid: string) {
        const data = await this.prismaService.user.findUnique({
            where: {
                id: authid,
            },
            select: {
                id: true,
                email: true,
                name: true,
                participated: {
                    select: {
                        id: true,
                        team: true,
                        event: {
                            select: {
                                id: true,
                                title: true,
                                image: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        return this.Success({
            message: 'User read successfully',
            data,
        });
    }

    async create(createUserDto: CreateUserDto) {
        const response = await this.prismaService.user.create({
            data: {
                ...createUserDto,
            },
        });
        return this.Success({
            message: 'User created successfully',
            data: response,
        });
    }
}
