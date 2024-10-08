import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type TranslationService = "Google" | "DeepL" | "OpenAI";

interface Translations {
  [key: string]: string;
}

interface ComparisonItem {
  word: string;
  differenceLevel: number;
}

interface TranslationComparisonProps {
  translations: Translations;
}

const TranslationComparison: React.FC<TranslationComparisonProps> = ({
  translations,
}) => {
  const [comparisonResults, setComparisonResults] = useState<{
    [key in TranslationService]: ComparisonItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }>({} as any);
  const [differenceStats, setDifferenceStats] = useState<{
    [key in TranslationService]: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }>({} as any);

  useEffect(() => {
    const compareTranslations = () => {
      const services = Object.keys(translations) as TranslationService[];
      const words = services.map((service) => tokenize(translations[service]));
      const results: { [key in TranslationService]: ComparisonItem[] } =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stats: { [key in TranslationService]: number } = {} as any;

      services.forEach((service) => {
        results[service] = compareWithOthers(
          words[services.indexOf(service)],
          words,
          services,
          service
        );
        stats[service] = calculateDifferencePercentage(results[service]);
      });

      setComparisonResults(results);
      setDifferenceStats(stats);
    };

    compareTranslations();
  }, [translations]);

  const tokenize = (text: string): string[] => {
    return text.match(/\S+/g) || [];
  };

  const compareWithOthers = (
    baseWords: string[],
    allWords: string[][],
    services: TranslationService[],
    baseService: TranslationService
  ): ComparisonItem[] => {
    return baseWords.map((word, index) => {
      let differenceLevel = 0;
      const windowSize = 10;

      services.forEach((service) => {
        if (service !== baseService) {
          const otherWords = allWords[services.indexOf(service)];
          let found = false;
          for (
            let i = Math.max(0, index - windowSize);
            i <= Math.min(otherWords.length - 1, index + windowSize);
            i++
          ) {
            if (word.toLowerCase() === otherWords[i].toLowerCase()) {
              found = true;
              break;
            }
          }
          if (!found) differenceLevel++;
        }
      });

      return { word, differenceLevel };
    });
  };

  const calculateDifferencePercentage = (items: ComparisonItem[]): number => {
    const differentWords = items.filter(
      (item) => item.differenceLevel > 0
    ).length;
    return (differentWords / items.length) * 100;
  };

  const getColor = (level: number): string => {
    if (level === 0) return "";
    if (level === 1) return "bg-yellow-200";
    return "bg-red-200";
  };

  const renderWord = (item: ComparisonItem) => (
    <Tooltip>
      <TooltipTrigger>
        <span
          className={`px-1 mx-0.5 rounded ${getColor(item.differenceLevel)}`}
        >
          {item.word}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Difference Level: {item.differenceLevel}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex space-x-2">
          {Object.entries(differenceStats).map(([service, percentage]) => (
            <Badge key={service} variant="outline">
              {service}: {percentage.toFixed(2)}% different
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(comparisonResults).map(([service, result]) => (
            <Card key={service}>
              <CardHeader>
                <CardTitle>{service} Translation</CardTitle>
              </CardHeader>
              <CardContent>
                {result.map((item, index) => (
                  <React.Fragment key={index}>
                    {renderWord(item)}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TranslationComparison;
