"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService, ProductDetail } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { cartService } from "@/services/cartService";
import { toast } from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductDetail(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      await cartService.addToCart({
        productId: Number(id),
        quantity: quantity,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch (error) {
      toast.error("Không thể thêm sản phẩm vào giỏ hàng");
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      await cartService.addToCart({
        productId: Number(id),
        quantity: quantity,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      router.push("/cart");
    } catch (error) {
      toast.error("Không thể thêm sản phẩm vào giỏ hàng");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || "Không tìm thấy sản phẩm"}</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-10 md:py-12 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hình ảnh sản phẩm */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          {product.imageUrls.length > 0 && product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Không có hình ảnh</span>
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.price.toLocaleString("vi-VN")}đ
            </span>
            {product.averageRating !== null && (
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600 dark:text-gray-400">
                  {product.averageRating.toFixed(1)} ({product.totalReviews} đánh giá)
                </span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Mô tả sản phẩm</h2>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Thông tin xuất xứ</h2>
            <p className="text-gray-600 dark:text-gray-300">{product.originInfo}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Thông tin nhà cung cấp</h2>
            <div className="bg-gray-50 dark:bg-gray-800 py-2 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white">{product.farmer.farmName}</h3>
              <p className="text-gray-600 dark:text-gray-300">{product.farmer.farmAddress}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{product.farmer.bio}</p>
              <div className="mt-2">
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                  {product.farmer.certification}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Số lượng
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-4 py-1 border rounded-md">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Thêm vào giỏ hàng
            </button>
            <button 
              onClick={handleBuyNow}
              className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {relatedProduct.imageUrl ? (
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Không có hình ảnh</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{relatedProduct.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {relatedProduct.price.toLocaleString("vi-VN")}đ
                      </span>
                      {relatedProduct.averageRating !== null && (
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-600 dark:text-gray-400">
                            {relatedProduct.averageRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Đánh giá sản phẩm */}
      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Đánh giá sản phẩm</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {review.consumerAvatar ? (
                        <Image
                          src={review.consumerAvatar}
                          alt={review.consumerName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          {review.consumerName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">{review.consumerName}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{review.comment}</p>
                {review.farmerReply && (
                  <div className="mt-4 pl-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phản hồi từ nhà cung cấp:</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">{review.farmerReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 