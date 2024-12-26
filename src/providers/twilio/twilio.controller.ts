import { Controller, Get, Post, Res } from '@nestjs/common';
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
      'https://capitalmkt-automation-backend-09fa7b89d6dd.herokuapp.com/twilio/voice-response.xml';

    await this.twilioService.initiateCall(
      userPhoneNumber,
      twilioPhoneNumber,
      twimlUrl,
    );
  }

  @Get('voice-response.xml')
  async voiceResponse(@Res() res: Response): Promise<void> {
    res.type('text/xml');
    res.send(`
            <Response>
            <Say voice="alice">Bonjour miboune, c'est Proxi Ambulance!.</Say>
            <Pause length="1"/>
            <Say voice="alice">Je suis là pour vous aider.</Say>
            <Pause length="1"/>
            <Say voice="alice">Veuillez laisser un message après le bip sonore.</Say>
            </Response>
        `);
  }
}
