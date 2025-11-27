import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { env } from '../lib/env'
import { t } from '../lib/translations'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: env.pageTitle,
  description: t('registryDescription'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: env.pageTitle,
    description: t('registryDescription'),
    type: 'website',
    url: '/',
    siteName: env.pageTitle,
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: env.pageTitle,
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: env.pageTitle,
    description: t('registryDescription'),
    images: ['/android-chrome-512x512.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Playwrite+ZA:wght@100..400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}