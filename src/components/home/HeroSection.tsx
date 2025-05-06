"use client";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Chào mừng đến với</span>
                <span className="block text-brand-500">E-Book Consume</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Nền tảng kết nối người tiêu dùng với nông sản chất lượng cao từ các trang trại địa phương. 
                Chúng tôi cam kết mang đến những sản phẩm tươi ngon, an toàn và bền vững.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600 md:py-4 md:text-lg md:px-10"
                  >
                    Xem sản phẩm
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand-200 md:py-4 md:text-lg md:px-10"
                  >
                    Tìm hiểu thêm
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-56 sm:h-72 md:h-96 lg:h-[500px]">
              <Image
                className="object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&h=800&fit=crop"
                alt="Nông sản tươi ngon"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 