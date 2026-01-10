'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  lastScrapedAt: string;
}

const categoryIcons: Record<string, string> = {
  'fiction': '📖',
  'non-fiction': '📚',
  'childrens-books': '🧒',
  'crime-mystery': '🔍',
  'fantasy': '🐉',
  'romance': '💕',
  'thriller-suspense': '😱',
  'classic-fiction': '📜',
  'modern-fiction': '✨',
  'all-fiction-books': '📚',
  'erotic-fiction': '🔥',
};

export default function HomePage() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/navigation`)
      .then(res => res.json())
      .then(data => {
        setNavigation(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore <span className="text-blue-600">World of Books</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover thousands of books across various categories. 
          Click on a category to start exploring!
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{navigation.length}</div>
          <div className="text-gray-600 text-sm">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">1000+</div>
          <div className="text-gray-600 text-sm">Books Available</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">Live</div>
          <div className="text-gray-600 text-sm">Data Scraping</div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navigation.map((item, index) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-2 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {categoryIcons[item.slug] || '📚'}
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500">
                Click to browse →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Real-Time Data Scraping</h2>
        <p className="text-blue-100 mb-4">
          All product data is scraped live from World of Books using Crawlee + Playwright
        </p>
        <a 
          href="https://www.worldofbooks.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Visit Original Site ↗
        </a>
      </div>
    </div>
  );
}