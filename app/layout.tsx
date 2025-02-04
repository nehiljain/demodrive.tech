import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from './providers';

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
  title: "DemoDrive AI - Video and Docs Copilot",
  description: "Create stunning videos and guides with AI.",
  keywords: "video and docs creator, AI video and docs, technical writing, documentation improvement, API docs, developer experience",
  authors: [{ name: "DemoDrive AI" }],
  creator: "DemoDrive AI",
  publisher: "DemoDrive AI",
  metadataBase: new URL("https://demodrive.tech"),
  twitter: {
    card: "summary_large_image",
    creator: "@demodrive_ai",
    title: "DemoDrive AI - Video and Docs Copilot",
    description: "Create stunning videos and guides with AI.",
    images: ["/demodrive_og_image.png"],
  },
  openGraph: {
    title: "DemoDrive AI - Video and Docs Copilot",
    description: "Create stunning videos and guides with AI.",
    url: "https://demodrive.tech",
    siteName: "DemoDrive AI",
    images: [
      {
        url: "/demodrive_og_image.png",
        width: 1200,
        height: 630,
        alt: "DemoDrive AI - Video and Docs Copilot",
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
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
