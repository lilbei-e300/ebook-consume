"use client";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    content: "E-Book Consume giúp tôi dễ dàng tìm mua nông sản tươi ngon từ các trang trại địa phương. Chất lượng sản phẩm luôn được đảm bảo và giá cả rất hợp lý.",
    author: "Nguyễn Thị Hương",
    role: "Người tiêu dùng",
    avatar: "https://picsum.photos/seed/user1/100/100",
  },
  {
    id: 2,
    content: "Là một nông dân, tôi rất hài lòng với nền tảng này. Nó giúp tôi tiếp cận trực tiếp với người tiêu dùng, không cần qua trung gian, giúp tăng thu nhập đáng kể.",
    author: "Trần Văn Nam",
    role: "Nông dân",
    avatar: "https://picsum.photos/seed/user2/100/100",
  },
  {
    id: 3,
    content: "Hệ thống vận chuyển chuyên nghiệp, đảm bảo sản phẩm luôn tươi ngon khi đến tay người tiêu dùng. Tôi rất tự hào khi là một phần của E-Book Consume.",
    author: "Lê Văn Tùng",
    role: "Nhà vận chuyển",
    avatar: "https://picsum.photos/seed/user3/100/100",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Người dùng nói gì về chúng tôi
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Khám phá trải nghiệm của người dùng trên nền tảng E-Book Consume
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden p-6"
            >
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 