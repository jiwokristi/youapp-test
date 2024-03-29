import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from './lib/contexts/providers/toast';

import 'react-day-picker/dist/style.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | You App',
    default: 'You App',
  },
  description: 'You App is a mobile first project for my technical test.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="portal"></div>
        <main id="RootLayout">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </body>
    </html>
  );
}
