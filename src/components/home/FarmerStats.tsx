"use client";

const stats = [
  {
    id: 1,
    value: "1,000+",
    label: "Nông dân tham gia",
    description: "Cộng đồng nông dân đang phát triển mạnh mẽ trên nền tảng",
  },
  {
    id: 2,
    value: "50,000+",
    label: "Đơn hàng thành công",
    description: "Số lượng giao dịch thành công giữa nông dân và người tiêu dùng",
  },
  {
    id: 3,
    value: "95%",
    label: "Đánh giá tích cực",
    description: "Tỷ lệ hài lòng từ cả người mua và người bán trên nền tảng",
  },
  {
    id: 4,
    value: "30%",
    label: "Tăng thu nhập",
    description: "Mức tăng thu nhập trung bình của nông dân sau khi tham gia",
  },
];

export default function FarmerStats() {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Con số ấn tượng
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Những con số nói lên sự phát triển và thành công của cộng đồng nông dân trên E-Book Consume
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-extrabold text-brand-500">
                {stat.value}
              </div>
              <div className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                {stat.label}
              </div>
              <div className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tham gia ngay để trở thành một phần của câu chuyện thành công
          </p>
        </div>
      </div>
    </div>
  );
} 