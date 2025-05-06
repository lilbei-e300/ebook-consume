"use client";
import Image from "next/image";
import Link from "next/link";

interface ProductGridProps {
  category: string;
  sortBy: string;
  priceRange: { min: number; max: number };
  currentPage: number;
}

// Dữ liệu mẫu cho sản phẩm
const products = [
  {
    id: 1,
    name: "Rau cải xanh hữu cơ",
    description: "Rau cải xanh được trồng theo phương pháp hữu cơ, không sử dụng thuốc trừ sâu.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&h=300&fit=crop",
    category: "vegetables",
    farmer: "Nông trại Xanh",
    rating: 4.8,
    reviews: 120,
    inStock: true
  },
  {
    id: 2,
    name: "Táo đỏ hữu cơ",
    description: "Táo đỏ ngọt giòn, được trồng tại vùng núi cao, không sử dụng chất bảo quản.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&h=300&fit=crop",
    category: "fruits",
    farmer: "Vườn trái cây Sơn La",
    rating: 4.9,
    reviews: 85,
    inStock: true
  },
  {
    id: 3,
    name: "Gạo nếp cái hoa vàng",
    description: "Gạo nếp thơm ngon, được trồng tại vùng đồng bằng sông Hồng.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&h=300&fit=crop",
    category: "grains",
    farmer: "Hợp tác xã nông nghiệp Thái Bình",
    rating: 4.7,
    reviews: 210,
    inStock: true
  },
  {
    id: 4,
    name: "Sữa tươi nguyên chất",
    description: "Sữa tươi nguyên chất từ trang trại bò sữa, không pha trộn.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=400&h=300&fit=crop",
    category: "dairy",
    farmer: "Trang trại bò sữa Mộc Châu",
    rating: 4.6,
    reviews: 150,
    inStock: true
  },
  {
    id: 5,
    name: "Thịt lợn sạch",
    description: "Thịt lợn được nuôi theo phương pháp hữu cơ, không sử dụng chất tăng trưởng.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=400&h=300&fit=crop",
    category: "meat",
    farmer: "Trang trại lợn sạch Hà Nam",
    rating: 4.5,
    reviews: 95,
    inStock: true
  },
  {
    id: 6,
    name: "Cá hồi tươi",
    description: "Cá hồi tươi ngon, được nuôi tại vùng biển lạnh.",
    price: 250000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=400&h=300&fit=crop",
    category: "seafood",
    farmer: "Trang trại cá hồi Phú Yên",
    rating: 4.9,
    reviews: 75,
    inStock: true
  },
  {
    id: 7,
    name: "Mứt dâu tây",
    description: "Mứt dâu tây tự nhiên, không chất bảo quản, không đường hóa học.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&h=300&fit=crop",
    category: "processed",
    farmer: "Nhà máy chế biến Đà Lạt",
    rating: 4.7,
    reviews: 110,
    inStock: true
  },
  {
    id: 8,
    name: "Rau mầm hữu cơ",
    description: "Rau mầm được trồng theo phương pháp thủy canh, giàu dinh dưỡng.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400&h=300&fit=crop",
    category: "vegetables",
    farmer: "Trang trại rau mầm Hà Nội",
    rating: 4.8,
    reviews: 65,
    inStock: true
  },
  {
    id: 9,
    name: "Cam sành",
    description: "Cam sành ngọt mọng, được trồng tại vùng đất phù sa.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=400&h=300&fit=crop",
    category: "fruits",
    farmer: "Vườn cam Hà Giang",
    rating: 4.6,
    reviews: 130,
    inStock: true
  }
];

export default function ProductGrid({ category, sortBy, priceRange, currentPage }: ProductGridProps) {
  // Lọc sản phẩm theo danh mục
  let filteredProducts = category === "all" 
    ? products 
    : products.filter(product => product.category === category);
  
  // Lọc sản phẩm theo khoảng giá
  filteredProducts = filteredProducts.filter(
    product => product.price >= priceRange.min && product.price <= priceRange.max
  );
  
  // Sắp xếp sản phẩm
  switch (sortBy) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Mặc định sắp xếp theo id (mới nhất)
      filteredProducts.sort((a, b) => b.id - a.id);
  }
  
  // Phân trang
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  
  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Hiển thị {paginatedProducts.length} trong tổng số {filteredProducts.length} sản phẩm
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {!product.inStock && (
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
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
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
                  </div>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    ({product.reviews})
                  </span>
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
      
      {paginatedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.
          </p>
        </div>
      )}
    </div>
  );
} 