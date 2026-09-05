import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hydraulic Projects Database Schema',
  description: 'Supabase database schema generator for hydraulic construction projects.',
  openGraph: {
    title: 'Hydraulic Projects Database Schema',
    description: 'Supabase database schema generator for hydraulic construction projects.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="km">
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}
