import "./globals.css";
import type { Metadata } from "next";
import { appName } from "@/utils/utils";
import { Golos_Text } from 'next/font/google'
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";


const golos = Golos_Text({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: appName,
  description: "AI powered exam sheet evaluation",
  keywords: ["AI", "exam", "evaluation", "ai exam", "ai evaluation", "quiz", "grading", "Exam evaluation software",
    "Automated grading system",
    "AI-powered assessment tool",
    "Online exam grading",
    "Digital answer sheet evaluator",
    "Smart grading solution",
    "Educational technology platform",
    "Efficient exam assessment",
    "Automated scoring software",
    "AI-driven evaluation tool",
    "Online exam marking",
    "Digital assessment platform",
    "Smart exam grading",
    "AI-based scoring system",
    "Automated evaluation solution"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <Head>
        
        <link rel="favicon" href="/icon.png" />
      </Head>
      <body className={golos.className}>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <AppRouterCacheProvider>   {children}</AppRouterCacheProvider></body>
    </html>
  );
}
