'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  author?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  sourceUrl: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load products');
          setLoading(false);
        });
    }
  }, [slug]);

  const formatCategoryName = (slug: string) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">😕</div>
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to Categories
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {formatCategoryName(slug)} 📚
        </h1>
        <p className="text-gray-600">
          Showing <span className="font-semibold text-blue-600">{products.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600">Try refreshing or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-2">
                {/* Image */}
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`text-7xl ${product.imageUrl ? 'hidden' : ''}`}>📖</div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1 transition-colors">
                    {product.title}
                  </h3>
                  {product.author && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                      by {product.author}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      £{product.price.toFixed(2)}
                    </span>
                    <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}