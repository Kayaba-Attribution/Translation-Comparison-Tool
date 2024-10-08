// File: src/app/api/translate/openai/route.ts

import { NextResponse } from 'next/server';
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const TranslationResult = z.object({
  translatedText: z.string(),
  notes: z.string().optional(),
});

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06", // Use the latest available model
      messages: [
        { 
          role: "system", 
          content: `You are a highly skilled translator. Translate the given text from ${sourceLanguage || 'the detected language'} to ${targetLanguage}. Maintain the original tone and style as much as possible. If there are any cultural nuances or idioms that don't translate directly, provide a note about it.` 
        },
        { role: "user", content: text },
      ],
      response_format: zodResponseFormat(TranslationResult, "translation"),
    });

    const translation = completion.choices[0].message.parsed;

    return NextResponse.json(translation);
  } catch (error) {
    console.error('Error in OpenAI translation route:', error);
    return NextResponse.json({ error: 'Error translating text', details: error }, { status: 500 });
  }
}