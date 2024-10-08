// File: src/app/api/translate/deepl/route.ts

import { NextResponse } from 'next/server';
import * as deepl from 'deepl-node';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

// Function to map general language codes to DeepL-specific codes
function mapToDeepLSourceCode(code: string): deepl.SourceLanguageCode {
    const mapping: { [key: string]: deepl.SourceLanguageCode } = {
        EN: 'en',
        // Add other mappings if needed
    };
    return (mapping[code] || code) as deepl.SourceLanguageCode;
}

function mapToDeepLTargetCode(code: string): deepl.TargetLanguageCode {
    const mapping: { [key: string]: deepl.TargetLanguageCode } = {
        EN: 'en-US',  // Default to US English, you can change this to 'EN-GB' if preferred
        // Add other mappings if needed
    };
    return (mapping[code] || code) as deepl.TargetLanguageCode;
}

export async function POST(request: Request) {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        if (!DEEPL_API_KEY) {
            throw new Error('DEEPL_API_KEY is not set');
        }
        const translator = new deepl.Translator(DEEPL_API_KEY);

        const result = await translator.translateText(
            text,
            sourceLanguage ? mapToDeepLSourceCode(sourceLanguage) : null,
            mapToDeepLTargetCode(targetLanguage),
            {
                preserveFormatting: true,
                formality: 'default',
            }
        );

        return NextResponse.json({
            translatedText: Array.isArray(result) ? result[0].text : result.text,
            detectedSourceLang: Array.isArray(result) ? result[0].detectedSourceLang : result.detectedSourceLang,
        });
    } catch (error) {
        console.error('Error calling DeepL API:', error);
        return NextResponse.json({ error: 'Error translating text' }, { status: 500 });
    }
}