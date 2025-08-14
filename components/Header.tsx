import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏄‍♂️</span>
            <span className="text-xl font-bold text-gray-900">
              Surf Travel Blog
            </span>
          </Link>
          
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
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-ocean-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}