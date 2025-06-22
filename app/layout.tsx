
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PIRAMIDA Group - Real Estate Kosovo',
  description: 'Your trusted real estate partner in Kosovo since 2010. Find properties for sale and rent across Kosovo.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
