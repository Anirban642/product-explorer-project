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

  if (loading) {
    return (
      <div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg mb-4"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Categories
        </Link>
        <h1 className="text-3xl font-bold mt-4 capitalize">
          {slug.replace('-', ' ')} Books
        </h1>
        <p className="text-gray-600 mt-2">{products.length} products found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100 group-hover:border-blue-200 overflow-hidden">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">📖</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                  {product.title}
                </h3>
                {product.author && (
                  <p className="text-sm text-gray-600 mt-1">by {product.author}</p>
                )}
                <p className="text-lg font-bold text-green-600 mt-2">
                  £{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}