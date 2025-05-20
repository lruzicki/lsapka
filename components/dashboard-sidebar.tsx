"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Map,
  FileText,
  Users,
  Settings,
  Lightbulb,
  DollarSign,
  ImageIcon,
  Home,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Kalendarz",
      icon: <Calendar className="h-5 w-5" />,
      href: "/dashboard/calendar",
    },
    {
      title: "Karty wyjazdowe",
      icon: <Map className="h-5 w-5" />,
      href: "/dashboard/trips",
    },
    {
      title: "Dokumenty",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard/documents",
    },
    {
      title: "Drużyny",
      icon: <Users className="h-5 w-5" />,
      href: "/dashboard/teams",
    },
    {
      title: "Pomysły",
      icon: <Lightbulb className="h-5 w-5" />,
      href: "/dashboard/ideas",
    },
    {
      title: "Preliminarz",
      icon: <DollarSign className="h-5 w-5" />,
      href: "/dashboard/budget",
    },
    {
      title: "Galeria",
      icon: <ImageIcon className="h-5 w-5" />,
      href: "/dashboard/gallery",
    },
    {
      title: "Ustawienia",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
    },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 mt-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Powrót do strony głównej</span>
        </Link>
      </div>
    </aside>
  )
}
