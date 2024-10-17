"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DateEvent {
  id: string;
  date: Date;
  title: string;
  details: string;
}

const dummyData: DateEvent[] = [
  {
    id: "1",
    date: new Date(2024, 9, 6),
    title: "Our Amazing First Date!! ",
    details: "We went to Crabby Joe's, where we had a great conversation and discovered some common interests. We were both impressed by each other's passions and enthusiasm. After dinner, we headed back to my place, where she accidentally met my parents (LOL). We chatted about a lot of things, I gave her a tour of my room showcasing my collections, books, and other stuff. I even gave her some vintage bills, and some other small things. And, of course, we had to dance together! It was a great night, and we both felt a strong connection.",
  },
  {
    id: "2",
    date: new Date(2024, 9, 7),
    title: "Hiking -walk- and Spontaneous Picnic",
    details: "",
  },
  {
    id: "3",
    date: new Date(2024, 9, 9),
    title: "Sneaking at 12pm into Juan's room",
    details: "",
  },
  {
    id: "4",
    date: new Date(2024, 9, 10),
    title: "Weird -cool- books & Walk to the pond",
    details: "",
  },
  {
    id: "5",
    date: new Date(2024, 9, 13),
    title: "Thanks Giving Celebration with all the fam",
    details: "",
  },
  {
    id: "6",
    date: new Date(2024, 9, 15),
    title: "Cozy movie date night -Twilight-",
    details: "",
  },
];

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export default function Page() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredEvents = selectedDate
    ? dummyData.filter((event) => isSameDay(event.date, selectedDate))
    : dummyData;

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setExpandedId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={(date) =>
              !dummyData.some((event) => isSameDay(event.date, date))
            }
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">Our Past Dates</h1>
          <div className="text-sm mb-4 italic">total: {Object.keys(dummyData).length}</div>
          <ul className="space-y-4">
            {filteredEvents.map((event) => (
              <li key={event.id} className="border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm">{formatDate(event.date)}</span>
                  <span className="font-medium">{event.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(event.id)}
                  >
                    {expandedId === event.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    See More
                  </Button>
                </div>
                {expandedId === event.id && (
                  <div className="p-4">
                    <p>
                      <strong>Day:</strong>{" "}
                      {event.date.toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                    <p>
                      <strong>Title:</strong> {event.title}
                    </p>
                    <p>
                      <strong>Details:</strong> {event.details}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
