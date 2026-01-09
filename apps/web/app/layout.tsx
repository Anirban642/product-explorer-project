import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Product Explorer',
  description: 'Explore products from World of Books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                📚 Product Explorer
              </Link>
              <div className="flex items-center space-x-6">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  About
                </Link>
                <div className="text-sm text-gray-500">
                  World of Books
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}