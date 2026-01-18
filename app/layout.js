import './globals.css'
import { Comic_Neue } from 'next/font/google'

const comicNeue = Comic_Neue({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: '🎪 Royal Palace of Useless Challenges',
  description: 'The most hilariously useless website ever created!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comicNeue.className}>{children}</body>
    </html>
  )
}
