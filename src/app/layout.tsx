import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Система оценки учеников',
  description: 'Приложение для тренеров по выставлению оценок ученикам',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}