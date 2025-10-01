import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ArunaQuest | Experience Your Future Career, Today',
  description: 'Stop guessing. ArunaQuest lets you test-drive professions through realistic, interactive simulations, so you can choose your career path with confidence.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0B0A11] text-slate-300`}>
        {children}
      </body>
    </html>
  )
}