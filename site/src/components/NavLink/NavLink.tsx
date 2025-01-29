"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
type NavLinkType = {
    href: string
    name: string
    icon: React.ReactNode
}
export default function NavLink({ href, name, icon }: NavLinkType) {
    const route = usePathname()
    const classNames = `flex justify-between bg-gradient-to-l from-blue-500 text-white to-slate-400 hover:shadow-gray-500 transition-all items-center rounded-md shadow-md p-3 w-full ${route === href ? "active-link" : ""}`
    return (
        <Link href={href} className={classNames}>
            {name}
            {icon && icon}
        </Link>
    )
}
