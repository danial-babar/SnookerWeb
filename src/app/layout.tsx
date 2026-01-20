import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserIdProviderWrapper } from "@/components/providers/UserIdProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snooker Stats - Professional Snooker Statistics",
  description: "Track and analyze professional snooker player statistics, rankings, and match results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <UserIdProviderWrapper>
          <Header />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
        </UserIdProviderWrapper>
      </body>
    </html>
  );
}
