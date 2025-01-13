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
  title: "DemoDrive AI - Documentation Testing",
  description: "AI-powered documentation testing and improvement platform. Automatically test and improve your technical documentation with AI.",
  keywords: "documentation testing, AI documentation, technical writing, documentation improvement, API docs, developer experience",
  authors: [{ name: "DemoDrive AI" }],
  creator: "DemoDrive AI",
  publisher: "DemoDrive AI",
  twitter: {
    card: "summary_large_image",
    creator: "@demodrive_ai",
    title: "DemoDrive AI - Documentation Testing",
    description: "AI-powered documentation testing and improvement platform",
    // images: ["/sample_report_landing_page_screenshot.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://demodrive.tech"),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
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
