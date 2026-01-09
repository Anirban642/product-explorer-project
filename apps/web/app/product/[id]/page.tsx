'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ProductDetail {
  id: string;
  title: string;
  author?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  sourceUrl: string;
  detail?: {
    description?: string;
    ratingsAvg?: number;
    reviewsCount: number;
  };
  reviews?: Array<{
    id: string;
    author?: string;
    rating?: number;
    text?: string;
  }>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load product details');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-red-500">Error: {error || 'Product not found'}</div>;
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-8xl">📚</div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          
          {product.author && (
            <p className="text-lg text-gray-600 mb-4">by {product.author}</p>
          )}

          <div className="mb-4">
            {renderStars(product.detail?.ratingsAvg)}
            {product.detail?.reviewsCount && (
              <p className="text-sm text-gray-500 mt-1">
                {product.detail.reviewsCount} reviews
              </p>
            )}
          </div>

          <p className="text-3xl font-bold text-green-600 mb-6">
            £{product.price.toFixed(2)}
          </p>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold">
              Add to Cart
            </button>
            
            <a 
              href={product.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition text-center font-semibold"
            >
              View on World of Books ↗
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.detail?.description && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.detail.description}
          </p>
        </div>
      )}

      {/* Mock Reviews */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {[
            { id: '1', author: 'BookLover123', rating: 5, text: 'Absolutely fantastic read! Could not put it down.' },
            { id: '2', author: 'ReadingFan', rating: 4, text: 'Great story, well written. Highly recommend!' },
            { id: '3', author: 'BookwormMike', rating: 5, text: 'One of the best books I have read this year.' }
          ].map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{review.author}</span>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}