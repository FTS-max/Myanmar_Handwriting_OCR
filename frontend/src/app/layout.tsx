import type { Metadata } from 'next';
import { geistSans, geistMono, myanmarFont } from './fonts';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Myanmar Handwriting OCR',
  description: 'Convert handwritten Burmese text to digital format instantly',
  keywords: ['OCR', 'Myanmar', 'Burmese', 'Handwriting', 'Text Recognition'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${myanmarFont.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
