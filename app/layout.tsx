// app/layout.tsx
import type { Metadata } from 'next';
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Pam Christison | Full-Stack Developer Portfolio",
  description: "A portfolio showcasing software development projects, open-source contributions, and web applications built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}