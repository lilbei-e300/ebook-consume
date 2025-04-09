"use client";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Nông nghiệp hữu cơ: Xu hướng phát triển bền vững",
    excerpt: "Khám phá những lợi ích của nông nghiệp hữu cơ và cách nó đang thay đổi ngành nông nghiệp Việt Nam.",
    image: "https://picsum.photos/seed/news1/800/600",
    date: "15/05/2023",
    category: "Nông nghiệp",
    link: "/news/organic-farming-trend"
  },
  {
    id: 2,
    title: "Công nghệ blockchain trong truy xuất nguồn gốc nông sản",
    excerpt: "Công nghệ blockchain đang cách mạng hóa cách chúng ta theo dõi và xác minh nguồn gốc thực phẩm.",
    image: "https://picsum.photos/seed/news2/800/600",
    date: "10/05/2023",
    category: "Công nghệ",
    link: "/news/blockchain-in-agriculture"
  },
  {
    id: 3,
    title: "Hướng dẫn bảo quản rau củ quả tươi lâu",
    excerpt: "Những mẹo đơn giản giúp bảo quản rau củ quả tươi lâu hơn, giảm thiểu lãng phí thực phẩm.",
    image: "https://picsum.photos/seed/news3/800/600",
    date: "05/05/2023",
    category: "Mẹo vặt",
    link: "/news/preserve-fresh-vegetables"
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
        
        <div className="text-center mt-12">
          <Link 
            href="/news"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors duration-300"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  );
} 