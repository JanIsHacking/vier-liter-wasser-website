import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '75 Hard Challenge Tracker',
  description: 'Track your daily progress on the 75 Hard Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-md mx-auto bg-white min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

