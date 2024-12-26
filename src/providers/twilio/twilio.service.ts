import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async initiateCall(to: string, from: string, url: string): Promise<void> {
    await this.client.calls.create({
      to,
      from,
      url,
    });
  }

  async sendSms(to: string, from: string, body: string): Promise<void> {
    await this.client.messages.create({
      to,
      from,
      body,
    });
  }
}
