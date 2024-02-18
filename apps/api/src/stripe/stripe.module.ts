import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [StripeService, PrismaService],
    exports: [StripeService],
})
export class StripeModule {}
