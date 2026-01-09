'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  lastScrapedAt: string;
}

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-100 group-hover:border-blue-200">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Click to browse products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}