import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('prompt')
  async postPrompt(
    @Body() body: { prompt: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('POST /ai/prompt', body);
    const response = await this.aiService.generateTextFromPrompt(body.prompt);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const reader = response.data.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const update = JSON.parse(line);
          res.write(JSON.stringify(update));
        } catch (error) {
          console.error('Error parsing update:', error);
        }
      }
    }
  }
}
