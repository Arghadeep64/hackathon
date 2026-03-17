import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WellnessChatbot } from '@/components/wellness-chatbot'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: 'WellnessNudge - Your Health & Wellbeing Companion',
  description: 'Take micro-breaks, track your wellness, and find healthcare specialists near you. Gamified wellness reminders for a healthier workday.',
  keywords: ['wellness', 'health', 'micro-breaks', 'stretching', 'hydration', 'breathing', 'clinic finder', 'symptom checker'],
}

export const viewport: Viewport = {
  themeColor: '#2DD4BF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} dark`}>
      <body className="font-sans antialiased">
        {children}
        <WellnessChatbot />
        <Analytics />
      </body>
    </html>
  )
}
