import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: 'NKIH "Leśna Szkółka"',
  description: "Strona organizacji harcerskiej Leśna Szkółka",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo-lilijka.png', type: 'image/png' },
    ],
    shortcut: '/images/logo-lilijka.png',
    apple: '/images/logo-lilijka.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
