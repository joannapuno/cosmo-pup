import '@/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Clouds } from '@/components/Clouds';

config.autoAddCss = false;
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-space_grotesk',
});

export const metadata: Metadata = {
  title: 'Cosmo Pup',
  description: 'Now launching...',
};

const bgGradient =
  'bg-gradient-to-t from-[#3dabff] from-[25%] via-[#9eadff] via-[69%] to-[#ffbfbf] to-[100%]';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={`${bgGradient} ${space_grotesk.className} text-white`}>
        <Clouds className="fixed bottom-0 w-full -z-10 scale-125" />
        <main className="grid grid-rows-[auto_1fr] h-screen container mx-auto relative p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
