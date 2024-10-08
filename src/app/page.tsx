"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

// Language dictionary
type Language = {
  code: string;
  name: string;
};
const languages: Language[] = [
  { code: "la", name: "Latin" },
  { code: "el", name: "Ancient Greek" },
  { code: "ru", name: "Russian" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

// Function to get language name by code
const getLanguageName = (code: string): string => {
  const language = languages.find(lang => lang.code === code);
  return language ? language.name : code;
};

// Mock function to simulate API calls for DeepL and ChatGPT
const mockTranslateAPI = (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Translated to ${getLanguageName(targetLang)}: ${text}`);
    }, 1000);
  });
};

// Function to call Google Translate API
const googleTranslateAPI = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    console.log(`Translated from ${getLanguageName(sourceLang)} to ${getLanguageName(targetLang)}`);
    const response = await axios.post('/api/translate/google', {
      text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error calling Google Translate API:', error);
    return 'Error translating text';
  }
};

export default function TranslationComparisonTool() {
  const [inputText, setInputText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTranslations: { [key: string]: string } = {};

    // Google Translate (real API call)
    newTranslations['Google'] = await googleTranslateAPI(inputText, sourceLang, targetLang);

    // DeepL and ChatGPT (mock calls)
    newTranslations['DeepL'] = await mockTranslateAPI(inputText, sourceLang, targetLang);
    newTranslations['ChatGPT'] = await mockTranslateAPI(inputText, sourceLang, targetLang);

    setTranslations(newTranslations);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Translation Comparison Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate"
          className="w-full"
        />
        <div className="flex space-x-4">
          <Select onValueChange={setSourceLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Source language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setTargetLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Target language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Translate</Button>
      </form>
      {Object.keys(translations).length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(translations).map(([api, translation]) => (
            <Card key={api}>
              <CardHeader>
                <CardTitle>{api}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{translation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}