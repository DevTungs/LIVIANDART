'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Início' },
  { href: '/gallery', label: 'Galeria' },
  { href: '/about', label: 'Sobre' },
  { href: '/services', label: 'Serviços' },
  { href: '/contact', label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-pink-600 tracking-tight">
          Liv<span className="text-pink-400">Andrart</span>
        </Link>

        <button
          className="md:hidden p-2 text-pink-600"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-pink-800 hover:text-pink-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 space-y-3">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-pink-800 hover:text-pink-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
