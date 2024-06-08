import { Body, Controller, Post, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payment/webhook')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}
    @Post('/')
    async handleWebHook(@Body() data, @Headers() head) {
        const signature = head['stripe-signature'] as string;

        return await this.stripeService.handleWebHookEvent(data, signature);
    }
}
