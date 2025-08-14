'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl">🏄‍♂️</span>
            <span className="text-xl font-bold text-gray-900">
              Surf Travel Blog
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/destinations" 
              className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
            >
              Destinations
            </Link>
            <Link 
              href="/gear" 
              className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
            >
              Gear Reviews
            </Link>
            <Link 
              href="/culture" 
              className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
            >
              Culture
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-ocean-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/destinations" 
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Destinations
              </Link>
              <Link 
                href="/gear" 
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Gear Reviews
              </Link>
              <Link 
                href="/culture" 
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Culture
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}