// File: src/app/api/translate/google/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

export async function POST(request: Request) {
  const { text, sourceLanguage, targetLanguage } = await request.json();

  if (!text || !targetLanguage) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  console.log("Using KEYS: ", API_KEY, GOOGLE_TRANSLATE_API_URL);

  try {
    const response = await axios.post(
      GOOGLE_TRANSLATE_API_URL,
      {
        q: text,
        source: sourceLanguage || 'auto',
        target: targetLanguage,
        format: 'text',
      },
      {
        params: {
          key: API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error calling Google Translate API:', error);
    return NextResponse.json({ error: 'Error translating text' }, { status: 500 });
  }
}