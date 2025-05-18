"use client";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Xu hướng nông nghiệp thông minh 2025",
    excerpt: "Công nghệ AI và IoT đang thay đổi cách canh tác truyền thống, mang lại hiệu quả cao hơn cho nông dân.",
    image: "https://picsum.photos/seed/smart-farming-2025/800/600",
    date: "15/03/2025",
    category: "Công nghệ",
    link: "/news/smart-farming-2025"
  },
  {
    id: 2,
    title: "Nông sản sạch: Tiêu chuẩn mới 2025",
    excerpt: "Bộ tiêu chuẩn mới về nông sản sạch sẽ được áp dụng từ năm 2025, nâng cao chất lượng sản phẩm.",
    image: "https://picsum.photos/seed/clean-farming-2025/800/600",
    date: "10/03/2025",
    category: "Tiêu chuẩn",
    link: "/news/clean-farming-standards-2025"
  },
  {
    id: 3,
    title: "Thị trường nông sản hữu cơ 2025",
    excerpt: "Dự báo tăng trưởng mạnh của thị trường nông sản hữu cơ trong năm 2025, cơ hội cho nông dân.",
    image: "https://picsum.photos/seed/organic-market-2025/800/600",
    date: "05/03/2025",
    category: "Thị trường",
    link: "/news/organic-market-2025"
  }
];

export default function NewsSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tin tức & Cập nhật</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cập nhật những tin tức mới nhất về nông nghiệp, thực phẩm sạch và các xu hướng tiêu dùng
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.excerpt}
                </p>
                <Link 
                  href={item.link}
                  className="inline-flex items-center text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300"
                >
                  Đọc thêm
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 