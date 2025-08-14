import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Surf Travel Blog - Epic Waves & Hidden Gems',
  description: 'Discover the best surf destinations, gear reviews, and surf culture stories from around the world.',
  keywords: 'surf, travel, waves, surfing, destinations, gear reviews, surf culture',
  openGraph: {
    title: 'Surf Travel Blog - Epic Waves & Hidden Gems',
    description: 'Discover the best surf destinations, gear reviews, and surf culture stories from around the world.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}