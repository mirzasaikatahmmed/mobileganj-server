import type { Metadata } from "next";
import { Geist, Geist_Mono, Tiro_Bangla } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiroBangla = Tiro_Bangla({
  variable: "--font-bangla",
  weight: "400",
  subsets: ["bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mobile GANJ - Premium Smartphones & Accessories",
  description:
    "Buy premium smartphones and accessories with Dubai import, EMI facility, and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiroBangla.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
