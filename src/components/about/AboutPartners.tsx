"use client";

import Image from "next/image";

export default function AboutPartners() {
  const partners = [
    {
      name: "Đại học Công nghệ Đông Á",
      logo: "/images/const/logo-dai-hoc-cong-nghe-dong-a.jpg",
      description: "Đối tác cung cấp nông sản hữu cơ chất lượng cao",
    },
    {
      name: "Đại học Công nghệ Đông Á",
      logo: "/images/const/logo-dai-hoc-cong-nghe-dong-a.jpg",
      description: "Đối tác phân phối và logistics",
    },
    {
      name: "Đại học Công nghệ Đông Á",
      logo: "/images/const/logo-dai-hoc-cong-nghe-dong-a.jpg",
      description: "Đối tác công nghệ và phát triển nền tảng",
    },
    {
      name: "Đại học Công nghệ Đông Á",
      logo: "/images/const/logo-dai-hoc-cong-nghe-dong-a.jpg",
      description: "Đối tác hỗ trợ nông dân và phát triển nông nghiệp",
    },
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Đối tác của chúng tôi
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Cùng nhau xây dựng một nền nông nghiệp bền vững và hiện đại
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="relative h-20 w-full mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
                  {partner.name}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 