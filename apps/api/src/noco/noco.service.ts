import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NocoService {
    constructor(private prismaService: PrismaService) {}

    async getTagName(tagName: string, limit: string, page: string) {
        const data = await this.prismaService.tag.findMany({
            where: {
                name: {
                    contains: tagName,
                    mode: 'insensitive',
                },
            },
        });

        const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const endIndex = parseInt(page, 10) * parseInt(limit, 10);
        return data.slice(startIndex, endIndex);
    }

    async getSkillName(skillName: string, limit: string, page: string) {
        const data = await this.prismaService.tag.findMany({
            where: {
                name: {
                    contains: skillName,
                    mode: 'insensitive',
                },
            },
        });

        const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const endIndex = parseInt(page, 10) * parseInt(limit, 10);
        return data.slice(startIndex, endIndex);
    }

    async getSponsorName(sponsorName: string, limit: string, page: string) {
        const data = await this.prismaService.tag.findMany({
            where: {
                name: {
                    contains: sponsorName,
                    mode: 'insensitive',
                },
            },
        });

        const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const endIndex = parseInt(page, 10) * parseInt(limit, 10);
        return data.slice(startIndex, endIndex);
    }
}
