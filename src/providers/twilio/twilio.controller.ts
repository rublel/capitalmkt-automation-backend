import { Controller, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Response } from 'express';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('initiate-call')
  async initiateCall(): Promise<void> {
    const userPhoneNumber = '+972587091495';
    const twilioPhoneNumber = '+972587091495';
    const twimlUrl = 'http://localhost:3000/twilio/voice-response';

    await this.twilioService.initiateCall(
      userPhoneNumber,
      twilioPhoneNumber,
      twimlUrl,
    );
  }

  @Post('voice-response')
  async voiceResponse(res: Response): Promise<void> {
    res.type('text/xml');
    res.send(`
            <Response>
            <Say voice="alice">Bonjour, c'est votre assistant vocal.</Say>
            <Pause length="1"/>
            <Say voice="alice">Je suis là pour vous aider.</Say>
            <Pause length="1"/>
            <Say voice="alice">Veuillez laisser un message après le bip sonore.</Say>
            </Response>
        `);
  }
}
