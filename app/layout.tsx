import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from './providers';
import Navigation from "@/components/navigation";

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
  title: "DemoDrive AI - Listing Shorts AI",
  description: "Create stunning videos with AI.",
  keywords: "video creator, AI video, technical writing, documentation improvement, API docs, developer experience",
  authors: [{ name: "DemoDrive AI" }],
  creator: "DemoDrive AI",
  publisher: "DemoDrive AI",
  metadataBase: new URL("https://demodrive.tech"),
  twitter: {
    card: "summary_large_image",
    creator: "@demodrive_ai",
    title: "DemoDrive AI - Listing Shorts AI",
    description: "Create stunning videos with AI.",
    images: ["/demodrive_og_image.png"],
  },
  openGraph: {
    title: "DemoDrive AI - Listing Shorts AI",
    description: "Create stunning videos with AI.",
    url: "https://demodrive.tech",
    siteName: "DemoDrive AI",
    images: [
      {
        url: "/demodrive_og_image.png",
        width: 1200,
        height: 630,
        alt: "DemoDrive AI - Listing Shorts AI",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: '93x93' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen dark bg-background text-foreground`}
      >
        <PostHogProvider>
          <div className="relative">
            <Navigation />
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
