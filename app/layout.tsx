import "./global.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { AOS } from "./components/global";
import { Montserrat } from "next/font/google";
import type { Metadata, Viewport } from "next";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://emberpad.com"),
  icons: {
    icon: "/favicon.ico",
  },
  title: "Emberpad - Where Goals Become Commitments",
  description:
    "Transform your personal goals into social commitments. Track progress, get reminders from friends, and achieve more together.",
  applicationName: "Emberpad",
  authors: [{ name: "Emberpad Team", url: "https://emberpad.com" }],
  keywords: [
    "goals",
    "productivity",
    "social",
    "accountability",
    "tracking",
    "reminders",
  ],
  creator: "Emberpad",
  publisher: "Emberpad",
  generator: "Next.js",
  referrer: "origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://emberpad.com",
    title: "Emberpad - Where Goals Become Commitments",
    siteName: "Emberpad",
    locale: "en_US",
    images: [
      {
        url: "https://emberpad.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emberpad - Social Goal Tracking Platform",
      },
    ],
  },
  twitter: {
    site: "emberpad",
    creator: "emberpad",
    title: "Emberpad - Where Goals Become Commitments",
    description:
      "Transform your personal goals into social commitments. Track progress, get reminders from friends, and achieve more together.",
    card: "summary_large_image",
    images: ["https://emberpad.com/twitter-card.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Emberpad",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  abstract:
    "Transform your personal goals into social commitments. Track progress, get reminders from friends, and achieve more together.",
  category: "Productivity",
  classification: "Social Goal Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${montserrat.className} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />
        <AOS />
        {children}
      </body>
    </html>
  );
}
