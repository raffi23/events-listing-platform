import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${config.name} | ${config.short_name}`,
  description: config.description,
  openGraph: {
    title: config.name,
    description: config.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable} antialiased`}>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
