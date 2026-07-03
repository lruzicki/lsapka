import type { Metadata } from "next"
import Anniversary45Page from "./page-client"

export const metadata: Metadata = {
  title: "45-lecie Leśnej Szkółki",
  description: "Prywatna strona z informacjami o obchodach 45-lecia Leśnej Szkółki.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function Page() {
  return <Anniversary45Page />
}
