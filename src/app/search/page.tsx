"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DEFAULT_PRODUCT_IMAGE = "/images/product/images.jpg";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/search?keyword=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.code === 200) {
          setProducts(data.data.products);
        } else {
          setError(data.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tìm kiếm sản phẩm");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!query ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vui lòng nhập từ khóa tìm kiếm
              </h1>
            </div>
          ) : loading ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Đang tìm kiếm sản phẩm...
              </h1>
            </div>
          ) : error ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
                {error}
              </h1>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Kết quả tìm kiếm cho &quot;{query}&quot;
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Tìm thấy {products.length} sản phẩm
                </p>
              </div>

              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={product.imageUrl || DEFAULT_PRODUCT_IMAGE}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = DEFAULT_PRODUCT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {product.shortDescription}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-brand-500 font-medium">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-sm text-gray-500">
                          Còn {product.stock} sản phẩm
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Nhà cung cấp: {product.farmerName}
                        </span>
                      </div>
                      {product.averageRating !== null && (
                        <div className="mt-2 flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-500">
                            {product.averageRating.toFixed(1)} ({product.reviewCount} đánh giá)
                          </span>
                        </div>
                      )}
                      <div className="mt-6">
                        <Link
                          href={`/products/${product.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Không tìm thấy sản phẩm phù hợp
                  </h2>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Hãy thử với từ khóa khác hoặc xem tất cả sản phẩm
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/products"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600"
                    >
                      Xem tất cả sản phẩm
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 