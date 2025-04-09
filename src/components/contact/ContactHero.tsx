"use client";
import Image from "next/image";

export default function ContactHero() {
  return (
    <div className="relative bg-brand-50 dark:bg-gray-800 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-100/30 to-transparent dark:from-brand-900/30"></div>
        <Image
          src="https://picsum.photos/seed/contact-hero/1920/600"
          alt="Liên hệ với chúng tôi"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.
          </p>
        </div>
      </div>
    </div>
  );
} 