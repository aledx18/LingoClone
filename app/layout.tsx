/* eslint-disable no-undef */
/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Toaster } from 'sonner'
import ExitModal from '@/components/modals/exit-modal'
import HeartsModal from '@/components/modals/hearts-modal'

const inter = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlayQuiz',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <link rel='icon' href='/home.svg' sizes='any' />
        <body className={inter.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
