"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, {useEffect,useState}from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import AppInitializer from "./components/Loader/AppInitializer";

const inter = Inter({ subsets: ["latin"] });

const poppins = {
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
};

const josefin = {
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppInitializer>{children}</AppInitializer><Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

