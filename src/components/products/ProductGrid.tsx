"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/productService";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const DEFAULT_PRODUCT_IMAGE = "/images/product/images.jpg";

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-600" />
            <div className="p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_PRODUCT_IMAGE;
              }}
            />
            {product.stock === 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Hết hàng
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <span className="text-brand-600 dark:text-brand-400 font-bold">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {product.averageRating !== null && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.averageRating!)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}
              </div>
              <Link
                href={`/products/${product.id}`}
                className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:text-brand-700 dark:hover:text-brand-300"
              >
                Chi tiết
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 