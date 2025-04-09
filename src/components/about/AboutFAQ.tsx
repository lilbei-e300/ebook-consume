"use client";

import { useState } from "react";

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "E-Book Consume là gì?",
      answer: "E-Book Consume là nền tảng thương mại điện tử kết nối trực tiếp người nông dân với người tiêu dùng, cung cấp nông sản chất lượng cao với giá cả hợp lý.",
    },
    {
      question: "Làm thế nào để trở thành nông dân đối tác?",
      answer: "Bạn có thể đăng ký làm nông dân đối tác bằng cách tạo tài khoản trên nền tảng, cung cấp thông tin về nông trại và sản phẩm. Đội ngũ của chúng tôi sẽ kiểm tra và phê duyệt hồ sơ của bạn.",
    },
    {
      question: "Làm sao để đảm bảo chất lượng sản phẩm?",
      answer: "Chúng tôi có quy trình kiểm tra chất lượng nghiêm ngặt, bao gồm kiểm tra nguồn gốc, quy trình sản xuất và chất lượng sản phẩm. Tất cả sản phẩm đều được đảm bảo an toàn thực phẩm.",
    },
    {
      question: "Phương thức thanh toán nào được chấp nhận?",
      answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau như thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử và thanh toán khi nhận hàng (COD).",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "Nếu sản phẩm không đạt chất lượng hoặc không đúng như mô tả, chúng tôi sẽ hoàn tiền 100% cho bạn. Quy trình hoàn tiền được thực hiện trong vòng 7 ngày làm việc.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Những thông tin hữu ích về nền tảng của chúng tôi
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-6 w-6 text-gray-500 transform transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`px-6 pb-4 transition-all duration-200 ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-base text-gray-500 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 