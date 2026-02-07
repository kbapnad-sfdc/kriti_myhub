import type { Metadata } from "next";
import { Suspense } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kriti's AFDC Hub",
  description: "A curated collection of agents, Lucid charts, and packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${nunito.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex font-sans">
        <Suspense fallback={<div className="w-64 flex-shrink-0" />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
