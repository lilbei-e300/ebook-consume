"use client";
import Image from "next/image";

export default function AboutMission() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-300">
              E-Book Consume được thành lập với sứ mệnh kết nối người nông dân Việt Nam với người tiêu dùng, 
              tạo ra một chuỗi cung ứng nông sản minh bạch, hiệu quả và bền vững.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Kết nối trực tiếp</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Loại bỏ các khâu trung gian, giúp nông dân bán được sản phẩm với giá tốt hơn và người tiêu dùng mua được sản phẩm chất lượng với giá hợp lý.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Đảm bảo chất lượng</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Kiểm soát chặt chẽ quy trình sản xuất, đảm bảo sản phẩm đạt tiêu chuẩn an toàn thực phẩm và chất lượng cao.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phát triển bền vững</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Khuyến khích nông nghiệp hữu cơ, thân thiện với môi trường và phát triển bền vững cho tương lai.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/const/su-menh.jpg"
                alt="Sứ mệnh của chúng tôi"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 