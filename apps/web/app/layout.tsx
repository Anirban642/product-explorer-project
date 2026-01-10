import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Product Explorer | World of Books',
  description: 'Explore and discover books from World of Books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Product Explorer
                  </h1>
                  <p className="text-xs text-gray-500">Powered by World of Books</p>
                </div>
              </Link>
              <div className="flex items-center space-x-8">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  About
                </Link>
                <a 
                  href="https://www.worldofbooks.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Visit World of Books ↗
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">📚</span>
                  <span className="text-xl font-bold">Product Explorer</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover amazing books from World of Books. Browse categories, 
                  explore products, and find your next great read.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Technology</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Next.js 14</li>
                  <li>NestJS</li>
                  <li>Prisma + SQLite</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              <p>Built for Full-Stack Assignment © {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}