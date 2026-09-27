import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'GoCreative Programs | Bilingual Music, Art & Creative Learning',
  description: 'Bilingual music, art, and joyful learning for children and families. Explore MúsicaBaby, Being Bilingual Rocks! concerts, and creative workshops with Mi Amigo Hamlet and Alina Celeste.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
