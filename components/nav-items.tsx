"use client"
import { NAV_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
  const pathName = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathName === '/'
    return pathName?.startsWith(href)
  }
  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) =>
        <Link
          href={href}
          key={href}
          className={cn('hover:text-yellow-500 transitions-colors',
            isActive(href) ? 'text-yellow-500' : 'text-gray-400')}
        >
          {label}
        </Link>
      )}
    </ul>
  )
}

export default NavItems
