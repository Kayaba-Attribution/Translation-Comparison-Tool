"use client";
import React, { useState, useEffect } from "react";
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
import TranslationComparison from "./TranslationComparison";
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
    console.log(
      `OpenAI: from ${getLanguageName(sourceLang)} to ${getLanguageName(
        targetLang
      )}`
    );
    const response = await axios.post("/api/translate/openai", {
      text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    });
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.translatedText;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return `Error translating text: ${error}`;
  }
};

export default function TranslationComparisonTool() {
  const [inputText, setInputText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );
  const [status, setStatus] = useState<{ [key: string]: string }>({
    Google: "",
    DeepL: "",
    OpenAI: "",
  });
  const [timers, setTimers] = useState<{ [key: string]: number }>({
    Google: 0,
    DeepL: 0,
    OpenAI: 0,
  });
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};

    Object.keys(status).forEach((api) => {
      if (status[api] === "Translating") {
        intervals[api] = setInterval(() => {
          setTimers((prev) => ({ ...prev, [api]: prev[api] + 0.1 }));
        }, 100);
      } else if (intervals[api]) {
        clearInterval(intervals[api]);
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const useDeepL = sourceLang !== "LA" && targetLang !== "LA";

    setStatus({
      Google: "Translating",
      DeepL: useDeepL ? "Translating" : "X Latin",
      OpenAI: "Translating",
    });
    setTranslations({});
    setTimers({ Google: 0, DeepL: 0, OpenAI: 0 });

    const translationPromises = [
      googleTranslateAPI(inputText, sourceLang, targetLang).then((result) => {
        setStatus((prev) => ({ ...prev, Google: "Done" }));
        return { api: "Google", result };
      }),
      openAITranslateAPI(inputText, sourceLang, targetLang).then((result) => {
        setStatus((prev) => ({ ...prev, OpenAI: "Done" }));
        return { api: "OpenAI", result };
      }),
    ];

    if (useDeepL) {
      translationPromises.push(
        deeplTranslateAPI(inputText, sourceLang, targetLang).then((result) => {
          setStatus((prev) => ({ ...prev, DeepL: "Done" }));
          return { api: "DeepL", result };
        })
      );
    }

    const results = await Promise.all(translationPromises);

    interface TranslationResult {
      [key: string]: string;
    }
    
    const newTranslations = results.reduce<TranslationResult>((acc, { api, result }) => {
      acc[api] = result;
      return acc;
    }, {});

    setTranslations(newTranslations);
  };

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Translation Comparison Tool
      </h1>
      <p className="text-center mb-4">
        Enter your text, select source and target languages, then click
        [Translate] to compare results from different APIs. (DeepL Does not
        support Latin)
      </p>
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
      <div className="mt-8 grid grid-cols-3 md:grid-cols-3 gap-4 mb-4">
        {["Google", "DeepL", "OpenAI"].map((api) => (
          <Card key={api}>
            <CardHeader>
              <CardTitle>{api}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{status[api] || "Not started"}</p>
              <p>{timers[api].toFixed(1)}s</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {Object.keys(translations).length >= 2 && (
        <TranslationComparison translations={translations} />
      )}
      {showMessage && (
        <div className="fixed bottom-4 right-4 bg-pink-100 p-2 rounded-md shadow-md">
          <p className="text-pink-600 mr-2">With love from Juan to Alexis.</p>
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-0 right-0 text-pink-600 p-1"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
