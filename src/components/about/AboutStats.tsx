"use client";

export default function AboutStats() {
  const stats = [
    {
      label: "Nông dân đối tác",
      value: "10,000+",
      description: "Nông dân đã tham gia và tin tưởng vào nền tảng của chúng tôi",
    },
    {
      label: "Sản phẩm",
      value: "50,000+",
      description: "Sản phẩm nông nghiệp được bán trên nền tảng",
    },
    {
      label: "Người tiêu dùng",
      value: "100,000+",
      description: "Khách hàng đã mua sản phẩm qua nền tảng",
    },
    {
      label: "Tỉnh thành",
      value: "63",
      description: "Tỉnh thành đã có mặt trên nền tảng",
    },
  ];

  return (
    <div className="py-16 bg-brand-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Những con số biết nói
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Thống kê về quy mô và tầm ảnh hưởng của chúng tôi
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 text-center">
                <div className="text-4xl font-extrabold text-brand-500">
                  {stat.value}
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  {stat.label}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 