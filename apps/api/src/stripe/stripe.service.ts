import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY), {
      apiVersion: '2023-10-16',
    };
  }

  async createCheckoutSession(items: any[]): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      // might need to create a success page then redirect to tickets page
      success_url:process.env.WEB_URL+"/tickets",
      // can show a toast in frontend
      cancel_url: process.env.WEB_YRL+"/events?payment_error=true",
    });

    return { sessionId: session.id };
  }
}
