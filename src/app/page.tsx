"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Music, Map, Gamepad2, Book, Globe } from "lucide-react";
import Image from "next/image";

import CustomTimeAgo from "../components/utils/CustomTimeAgo";
// import TiltComponent from '../components/ui/TiltComponent';

const HomePage = () => {
  const [jokeOfTheDay, setJokeOfTheDay] = useState("");

  useEffect(() => {
    const jokes = [
      "In Soviet Russia, history rewrites you!",
      "Why don't scientists trust atoms? Because they make up everything!",
      "I used to be addicted to soap, but I'm clean now.",
      "Why did the scarecrow win an award? He was outstanding in his field!",
      "Why don't eggs tell jokes? They'd crack each other up!",
    ];
    setJokeOfTheDay(jokes[Math.floor(Math.random() * jokes.length)]);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      {/* Main content */}
      <main className="pt-8 p-6 flex flex-col items-center space-y-12">
        <div>
          <div className="text-2xl font-regular italic text-center pb-2">
            Welcome, To Our Website !
          </div>
          <div className="text-4xl font-semibold text-center">
            Alexis Liáng Shù & Juan David Gomez
          </div>
          <div className="text-sm text-center">
            It&apos;s been <CustomTimeAgo date="Oct 6, 2024" /> since we met :)
          </div>
          <div className="flex margin-auto justify-center pt-4">

          <Image className="rounded-lg"
            src="/gifs/cuteCats.gif"
            alt="Pic of us as cats"
            width={200}
            height={400}
            />
            </div>
        </div>
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Explore our past dates
            </h2>
            <p className="mb-4">
              Remember all the things that we have done in the past, add
              comments and photos!
            </p>

            <Link href="/dates">
            <Button variant="outline" className="w-full" disabled >
              Go to Dates
            </Button>
            </Link>
          </Card>

          {/* Translation App Section */}
          <Card className="p-6 col-span-1 md:col-span-2  shadow-lg hover:shadow-xl transition-shadow">
            <Globe className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Translate Compare</h2>
            <p className="mb-4">
              Compare translations from Google, DeepL, and OpenAI in one place.
              Analyze lexical, semantic, and precision differences.
            </p>
            <Link href="/translate">
              <Button variant="outline" className="w-full">
                Visit the Translation App
              </Button>
            </Link>
          </Card>

          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <Book className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Book Nook</h2>
            <p className="mb-4">
              Your virtual bookshelf of favorite finds from used bookstores.
            </p>
            <Button disabled variant="outline" className="w-full">
              Visit the Book Nook
            </Button>
          </Card>

          {/* Joke of the Day Section */}
          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <Gamepad2 className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Joke of the Day 🤣</h2>
            <p className="mb-4">
              A personalized History joke, including Soviet ones!!
            </p>
            <Button disabled variant="outline" className="w-full">
              Explore Visual Novels
            </Button>
            <p className="text-lg italic">{jokeOfTheDay}</p>
          </Card>

          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <Music className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Music Corner 🎶</h2>
            <p className="mb-4">
              Listen to your favorite Jpop and Cantopop songs.
            </p>
            <Button disabled variant="outline" className="w-full">
              Go to Music Corner
            </Button>
          </Card>

          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <Map className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Adventure Journal</h2>
            <p className="mb-4">
              Map your travels and places you&apos;d love to visit.
            </p>
            <Button disabled variant="outline" className="w-full">
              View Adventure Journal
            </Button>
          </Card>

          <Card className="p-6 col-span-1  shadow-lg hover:shadow-xl transition-shadow">
            <Gamepad2 className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Visual Novel Vault</h2>
            <p className="mb-4">
              Keep track of the visual novels you&apos;ve played or want to
              explore.
            </p>
            <Button disabled variant="outline" className="w-full">
              Explore Visual Novels
            </Button>
          </Card>
        </div>
      </main>

      <footer className="p-6 text-center text-blue-600">
        <p>Made with love for Alexis 💙</p>
      </footer>
    </div>
  );
};

export default HomePage;
