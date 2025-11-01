import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {openAI} from '@genkit-ai/openai';
import 'dotenv/config';

export const ai = genkit({
  plugins: [
    googleAI(),
    openAI({
      apiKey: process.env.AIMLAPI_KEY || '',
      baseURL: 'https://api.aimlapi.com/v1',
    }),
  ],
  model: 'openai/gpt-4o',
});
