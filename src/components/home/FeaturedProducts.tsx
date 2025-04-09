"use client";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Rau sạch hữu cơ",
    description: "Rau được trồng theo phương pháp hữu cơ, không sử dụng thuốc bảo vệ thực vật",
    image: "https://picsum.photos/seed/vegetables/800/600",
    price: "50.000đ/kg",
    farmer: "Trang trại Xanh",
  },
  {
    id: 2,
    name: "Trái cây theo mùa",
    description: "Trái cây tươi ngon được thu hoạch đúng mùa vụ",
    image: "https://picsum.photos/seed/fruits/800/600",
    price: "80.000đ/kg",
    farmer: "Vườn trái cây Y",
  },
  {
    id: 3,
    name: "Gạo sạch",
    description: "Gạo được trồng theo tiêu chuẩn VietGAP",
    image: "https://picsum.photos/seed/rice/800/600",
    price: "25.000đ/kg",
    farmer: "Hợp tác xã Z",
  },
];

export default function FeaturedProducts() {
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
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
                <div className="mt-4">
                  <span className="text-brand-500 font-medium">{product.price}</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Nhà cung cấp: {product.farmer}
                  </span>
                </div>
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