import "./global.css";
import { Toaster } from "sonner";
import { AOS } from "./components/global";
import { AuthProvider } from "./contexts/AuthContext";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${spaceGrotesk.className} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster richColors />
          <AOS />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
