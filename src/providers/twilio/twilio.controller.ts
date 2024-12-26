import { Controller, Post, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Response } from 'express';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('initiate-call')
  async initiateCall(): Promise<void> {
    const userPhoneNumber = '+972587091495';
    const twilioPhoneNumber = '+972587091495';
    const twimlUrl =
      'https://capitalmkt-automation-backend-09fa7b89d6dd.herokuapp.com/twilio/voice-response';

    await this.twilioService.initiateCall(
      userPhoneNumber,
      twilioPhoneNumber,
      twimlUrl,
    );
  }

  @Post('voice-response')
  async voiceResponse(@Res() res: Response): Promise<void> {
    res.type('text/xml');
    res.sendFile('response.xml', { root: './src/providers/twilio' });
  }
}
