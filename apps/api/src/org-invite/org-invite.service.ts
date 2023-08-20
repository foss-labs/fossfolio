import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

    async inviteToOrg() {}
}
