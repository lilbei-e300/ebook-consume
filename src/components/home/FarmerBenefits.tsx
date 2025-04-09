"use client";
import Image from "next/image";

const benefits = [
  {
    id: 1,
    title: "Tiếp cận trực tiếp người tiêu dùng",
    description: "Không qua trung gian, giúp tăng lợi nhuận và xây dựng mối quan hệ trực tiếp với khách hàng",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Quản lý đơn hàng thông minh",
    description: "Hệ thống quản lý đơn hàng hiện đại, giúp theo dõi và xử lý đơn hàng dễ dàng, chuyên nghiệp",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Hỗ trợ vận chuyển",
    description: "Kết nối với đội ngũ vận chuyển chuyên nghiệp, đảm bảo sản phẩm đến tay người tiêu dùng nhanh chóng",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Thanh toán minh bạch",
    description: "Hệ thống thanh toán an toàn, rõ ràng. Nhận tiền nhanh chóng sau khi giao hàng thành công",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Xây dựng thương hiệu",
    description: "Cơ hội quảng bá sản phẩm và xây dựng thương hiệu cá nhân trên nền tảng số",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Hỗ trợ kỹ thuật 24/7",
    description: "Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng giúp đỡ bạn trong quá trình sử dụng nền tảng",
    icon: (
      <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function FarmerBenefits() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Quyền lợi của người nông dân
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Tham gia nền tảng E-Book Consume, nông dân được hưởng nhiều quyền lợi hấp dẫn
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-md">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Đăng ký ngay hôm nay để trở thành một phần của cộng đồng nông dân trên E-Book Consume
          </p>
        </div>
      </div>
    </div>
  );
} 