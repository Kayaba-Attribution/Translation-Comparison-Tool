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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

// Language dictionary
type Language = {
  code: string;
  name: string;
};
const languages: Language[] = [
  { code: "LA", name: "Latin" },
  { code: "EL", name: "Greek" },
  { code: "RU", name: "Russian" },
  { code: "EN", name: "English" },
  { code: "ES", name: "Spanish" },
  { code: "FR", name: "French" },
];

// Function to get language name by code
const getLanguageName = (code: string): string => {
  const language = languages.find((lang) => lang.code === code);
  return language ? language.name : code;
};

// Function to call Google Translate API
const googleTranslateAPI = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    console.log(
      `Google Translate: from ${getLanguageName(
        sourceLang
      )} to ${getLanguageName(targetLang)}`
    );
    const response = await axios.post("/api/translate/google", {
      text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error calling Google Translate API:", error);
    return "Error translating text";
  }
};

// Function to call DeepL API
const deeplTranslateAPI = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    console.log(
      `DeepL: from ${getLanguageName(sourceLang)} to ${getLanguageName(
        targetLang
      )}`
    );
    const response = await axios.post("/api/translate/deepl", {
      text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    return "Error translating text";
  }
};

// Function to call OpenAI API
const openAITranslateAPI = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    console.log(`OpenAI: from ${getLanguageName(sourceLang)} to ${getLanguageName(targetLang)}`);
    const response = await axios.post('/api/translate/openai', {
      text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    });
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.translatedText;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return `Error translating text: ${error}`;
  }
};

export default function TranslationComparisonTool() {
  const [inputText, setInputText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    Google: false,
    DeepL: false,
    OpenAI: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading({ Google: true, DeepL: true, OpenAI: true });
    setTranslations({});

    // Google Translate
    googleTranslateAPI(inputText, sourceLang, targetLang).then((result) => {
      setTranslations((prev) => ({ ...prev, Google: result }));
      setLoading((prev) => ({ ...prev, Google: false }));
    });

    // DeepL
    deeplTranslateAPI(inputText, sourceLang, targetLang).then((result) => {
      setTranslations((prev) => ({ ...prev, DeepL: result }));
      setLoading((prev) => ({ ...prev, DeepL: false }));
    });

    // OpenAI
    openAITranslateAPI(inputText, sourceLang, targetLang).then((result) => {
      setTranslations((prev) => ({ ...prev, OpenAI: result }));
      setLoading((prev) => ({ ...prev, OpenAI: false }));
    });
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Google', 'DeepL', 'OpenAI'].map((api) => (
          <Card key={api}>
            <CardHeader>
              <CardTitle>{api}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading[api] ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              ) : (
                <p>{translations[api] || 'No translation yet'}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
