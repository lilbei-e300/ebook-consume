"use client";
import { useState } from "react";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?",
      answer: "Bạn có thể liên hệ với bộ phận hỗ trợ khách hàng qua email support@ebookconsume.com hoặc số điện thoại hotline (+84) 123 456 789 trong giờ hành chính.",
    },
    {
      question: "Thời gian phản hồi email là bao lâu?",
      answer: "Chúng tôi cam kết phản hồi tất cả email trong vòng 24 giờ làm việc. Trong trường hợp khẩn cấp, vui lòng liên hệ qua số điện thoại hotline.",
    },
    {
      question: "Tôi có thể gặp nhân viên tư vấn trực tiếp không?",
      answer: "Có, bạn có thể đặt lịch hẹn gặp nhân viên tư vấn trực tiếp tại văn phòng của chúng tôi. Vui lòng liên hệ qua email hoặc điện thoại để được sắp xếp lịch hẹn phù hợp.",
    },
    {
      question: "Làm thế nào để trở thành đối tác của E-Book Consume?",
      answer: "Để trở thành đối tác, vui lòng gửi email đến partners@ebookconsume.com với thông tin về công ty của bạn. Nhân viên phụ trách sẽ liên hệ và hướng dẫn các bước tiếp theo.",
    },
    {
      question: "Tôi có thể gửi góp ý về dịch vụ ở đâu?",
      answer: "Bạn có thể gửi góp ý qua form liên hệ trên website hoặc email feedback@ebookconsume.com. Chúng tôi luôn mong muốn nhận được ý kiến đóng góp để cải thiện dịch vụ.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Những thông tin hữu ích về cách liên hệ với chúng tôi
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden"
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