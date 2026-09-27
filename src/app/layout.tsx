import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMHSE | Sağlamlıq, Əməyin Təhlükəsizliyi və Ətraf Mühit",
  description: "İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti birlikdə qurulur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
