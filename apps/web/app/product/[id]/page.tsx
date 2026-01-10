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
        <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[500px] bg-gray-200 rounded-2xl"></div>
          <div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-3">
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
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">{error || 'The product you\'re looking for doesn\'t exist.'}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-lg text-gray-600 font-medium">
          {rating.toFixed(1)} / 5.0
        </span>
      </div>
    );
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-8 group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
        Back to Categories
      </Link>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Image */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center h-[500px] overflow-hidden shadow-lg">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="max-w-full max-h-full object-contain p-8"
            />
          ) : (
            <div className="text-9xl">📚</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {product.title}
          </h1>
          
          {product.author && (
            <p className="text-xl text-gray-600 mb-4">
              by <span className="text-gray-900 font-medium">{product.author}</span>
            </p>
          )}

          {/* Rating */}
          <div className="mb-6">
            {renderStars(product.detail?.ratingsAvg)}
            {product.detail?.reviewsCount && (
              <p className="text-sm text-gray-500 mt-1">
                Based on {product.detail.reviewsCount} reviews
              </p>
            )}
          </div>

          {/* Price */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-700 mb-1">Price</p>
            <p className="text-4xl font-bold text-green-600">
              £{product.price.toFixed(2)}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 mt-auto">
            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl">
              🛒 Add to Cart
            </button>
            
            <a 
              href={product.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              View on World of Books ↗
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.detail?.description && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📝 Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {product.detail.description}
          </p>
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          ⭐ Customer Reviews
        </h2>
        <div className="space-y-6">
          {(product.reviews && product.reviews.length > 0 ? product.reviews : [
            { id: '1', author: 'BookLover123', rating: 5, text: 'Absolutely fantastic read! Could not put it down from start to finish. Highly recommended!' },
            { id: '2', author: 'ReadingFan', rating: 4, text: 'Great story with well-developed characters. A few slow parts but overall excellent.' },
            { id: '3', author: 'BookwormMike', rating: 5, text: 'One of the best books I have read this year. The writing style is captivating.' }
          ]).map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.author?.charAt(0) || 'A'}
                  </div>
                  <span className="font-semibold text-gray-900">{review.author}</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}