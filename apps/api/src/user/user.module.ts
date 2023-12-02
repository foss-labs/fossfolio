import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationService } from '../organization/organization.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService, OrganizationService],
    controllers: [UserController],
})
export class UserModule {}
