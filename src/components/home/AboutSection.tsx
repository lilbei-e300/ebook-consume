"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Về E-Book Consume
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
              E-Book Consume là nền tảng kết nối trực tiếp giữa người nông dân và người tiêu dùng,
              mang đến những sản phẩm nông nghiệp chất lượng cao với giá cả hợp lý.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Sản phẩm chất lượng
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Tất cả sản phẩm đều được kiểm định chất lượng và đảm bảo an toàn vệ sinh thực phẩm.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Giao hàng nhanh chóng
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Hệ thống vận chuyển chuyên nghiệp, đảm bảo sản phẩm đến tay người tiêu dùng trong
                    thời gian ngắn nhất.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Giá cả cạnh tranh
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Loại bỏ các khâu trung gian, mang đến sản phẩm với giá tốt nhất cho người tiêu dùng.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="relative">
              <Image
                src="/images/const/nongsan.jpeg"
                alt="Nông nghiệp thông minh"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 