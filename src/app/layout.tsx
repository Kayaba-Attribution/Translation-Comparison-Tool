import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LoveMessage from "@/components/utils/LoveMessage";
import { Navbar } from "@/components/utils/navbar";
import { ThemeProvider } from "@/components/utils/themeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Alexis's App - Juan's Version",
  description: "An app with love from Juan to Alexis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        ></ThemeProvider>
        <Navbar />
        {children}
        <LoveMessage />
      </body>
    </html>
  );
}
