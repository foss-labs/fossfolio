import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe.controller';

@Module({
    imports: [ConfigModule],
    providers: [StripeService, PrismaService],
    exports: [StripeService],
    controllers: [StripeController],
})
export class StripeModule {}
