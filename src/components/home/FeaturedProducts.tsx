"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { productService, Product } from "@/services/productService";

const DEFAULT_PRODUCT_IMAGE = "/images/product/images.jpg";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getSuggestedProducts(10);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              Đang tải sản phẩm...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Sản phẩm nổi bật
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Khám phá những sản phẩm chất lượng cao từ các trang trại đối tác của chúng tôi
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
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

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
} 