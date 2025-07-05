import { Inter } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Inter font (replacing Geist Sans)
export const geistSans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

// JetBrains Mono font (replacing Geist Mono)
export const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

// Myanmar font (Pyidaungsu) - for Burmese text
export const myanmarFont = localFont({
  src: [
    {
      path: '../../public/fonts/Pyidaungsu.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pyidaungsu-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-myanmar',
});
