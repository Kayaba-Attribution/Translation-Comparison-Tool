"use client";
import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export function Navbar() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState("light");

  function toggleTheme() {
    console.log("currentTheme", currentTheme);
    // toggles between light and dark mode
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto container flex h-14 items-center w-full px-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/images/globe.png" alt="Alexis Web" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Alexis & Juan κόσμος</span>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#explore"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Explore
            </Link>
            <Link
              href="#book-nook"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Book Nook
            </Link>
            <Link
              href="#joke"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Joke of the Day
            </Link>
            <Link
              href="#translate"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Translate
            </Link>
            <Link
              href="#music"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Music
            </Link>
            <Link
              href="#adventure"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Adventure
            </Link>
            <Link
              href="#visual-novel"
              className="hidden sm:inline-block transition-colors hover:text-primary"
            >
              Visual Novel
            </Link>
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
              >
                <svg
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M3 5H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 12H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 19H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Switch onClick={toggleTheme} />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="flex flex-col space-y-4">
      <Link
        href="#explore"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Explore
      </Link>
      <Link
        href="#book-nook"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Book Nook
      </Link>
      <Link
        href="#joke"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Joke of the Day
      </Link>
      <Link
        href="#translate"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Translate
      </Link>
      <Link
        href="#music"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Music
      </Link>
      <Link
        href="#adventure"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Adventure
      </Link>
      <Link
        href="#visual-novel"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Visual Novel
      </Link>
    </nav>
  );
}
