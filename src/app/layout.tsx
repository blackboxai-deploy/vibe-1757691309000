import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'EduTech - Cursos Online de Qualidade',
    template: '%s | EduTech'
  },
  description: 'Aprenda com os melhores professores e transforme sua carreira. Cursos online de programação, design, marketing digital e muito mais.',
  keywords: ['cursos online', 'educação', 'programação', 'design', 'marketing digital', 'data science'],
  authors: [{ name: 'EduTech' }],
  creator: 'EduTech',
  publisher: 'EduTech',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'EduTech',
    title: 'EduTech - Cursos Online de Qualidade',
    description: 'Aprenda com os melhores professores e transforme sua carreira.',
    url: 'https://edutech.com',
    images: [
      {
        url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a0358b0-6e99-44e9-9d7f-d2332be12a8f.png',
        width: 1200,
        height: 630,
        alt: 'EduTech - Plataforma de Cursos Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduTech - Cursos Online de Qualidade',
    description: 'Aprenda com os melhores professores e transforme sua carreira.',
    images: ['https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba88c03c-2fb9-4b0a-b538-3447bfc0c729.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}