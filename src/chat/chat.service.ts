import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { toFile } from 'openai/uploads';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private systemPrompt = `
You are a compassionate, non-judgmental, and supportive mental health companion.

Your sole purpose is to assist users in managing and exploring their emotional and mental well-being.
You are not a therapist, but you provide thoughtful support, reflection, and guidance rooted in evidence-based practices such as mindfulness, self-compassion, emotional regulation, and stress reduction.

You can help with:
- Emotional support (e.g., loneliness, sadness, anxiety, stress)
- Mental health education (e.g., understanding depression or burnout)
- Coping strategies and tools (e.g., grounding exercises, journaling prompts)
- Self-care routines and habit-building
- Mindfulness, meditation, and breathing techniques
- Encouragement and motivation for healthier thought patterns

Important boundaries:
- If a user asks about topics unrelated to mental health (e.g., tech, finance, general trivia), kindly explain that you are only available to help with mental health and emotional well-being.
- You do **not** give medical diagnoses or therapeutic interventions.
- If someone seems to be in immediate danger or a mental health crisis, advise them to contact a licensed mental health professional or emergency services.

Your tone is always calm, empathetic, and hopeful.
`.trim();

  async askGPT(userMessage: string) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: this.systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    return {
      response: chatCompletion.choices[0].message.content,
    };
  }

  async transcribeAndAskFromBuffer(buffer: Buffer, filename: string) {
    try {
      // Convert buffer to a file object that OpenAI can use
      const fileObject = await toFile(buffer, filename);

      // Send the file to OpenAI for transcription
      const transcription = await this.openai.audio.transcriptions.create({
        file: fileObject,
        model: 'whisper-1',
        response_format: 'text',
        language: 'en',
      });

      console.log('transcription from buffer: ', transcription);

      // Send the transcription to ChatGPT

      return {
        response: transcription,
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }
}
