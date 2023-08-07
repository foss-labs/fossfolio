import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizationService } from 'src/organization/organization.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService, OrganizationService],
    controllers: [UserController],
})
export class UserModule {}
