import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: 'Niezależny Krąg Instruktorów Harcerskich „Leśna Szkółka"',
  description: "Strona organizacji harcerskiej Leśna Szkółka",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
