import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  async generateTextFromPrompt(prompt: string) {
    const url = process.env.AI_URL;
    const response = await axios.post(`${url}/api/generate`, {
      model: "llama2",
      prompt,
      stream: true
    }, {
      responseType: 'stream',
      adapter: 'fetch'
    });
    return response;
  }
}
