import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('checkout')
export class YourController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  // TODO- create a dto of request body to render on stripe checkout
  async createCheckoutSession(@Body() items: any): Promise<any> {
    const session = await this.stripeService.createCheckoutSession(items);
    return session;
  }
}
