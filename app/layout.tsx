import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
// import { ScrollToTop } from '@/components/scroll-to-top'

export const metadata: Metadata = {
  title:"English News Paper | Breaking News | Latest Today News in English | News Headlines India - The Pioneer",
  description: 'Created with Daily Pioneer',
  generator: 'Daily Pioneer',
  icons: {
    icon: '/TP.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" richColors />
  {/* <ScrollToTop /> */}
        <Analytics />
      </body>
    </html>
  )
}
