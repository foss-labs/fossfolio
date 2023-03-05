import { Injectable } from '@nestjs/common';
import { CreateException } from './exception/create.exception';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async read(authid: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                id: authid,
            },
        });
        return this.Success({
            message: 'User read successfully',
            data,
        });
    }

    async create(createProfileDto: CreateProfileDto) {
        const resp = await this.read(createProfileDto.id);
        if (resp.data != null) {
            return new CreateException('User already exists');
        }

        const data = await this.prisma.user.create({
            data: {
                ...createProfileDto,
            },
        });
        return this.Success({
            message: 'User created successfully',
            data,
        });
    }
}
