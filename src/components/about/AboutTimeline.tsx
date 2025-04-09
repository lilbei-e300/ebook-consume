"use client";

export default function AboutTimeline() {
  const milestones = [
    {
      year: "2020",
      title: "Thành lập công ty",
      description: "E-Book Consume được thành lập với sứ mệnh kết nối nông dân và người tiêu dùng.",
    },
    {
      year: "2021",
      title: "Ra mắt nền tảng",
      description: "Phát hành phiên bản beta của nền tảng thương mại điện tử nông sản.",
    },
    {
      year: "2022",
      title: "Mở rộng thị trường",
      description: "Mở rộng hoạt động ra 10 tỉnh thành trên cả nước.",
    },
    {
      year: "2023",
      title: "Đổi mới công nghệ",
      description: "Nâng cấp hệ thống với AI và blockchain để tăng tính minh bạch.",
    },
    {
      year: "2024",
      title: "Phát triển bền vững",
      description: "Triển khai chương trình hỗ trợ nông dân hữu cơ và phát triển bền vững.",
    },
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Hành trình phát triển
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Những cột mốc quan trọng trong quá trình xây dựng và phát triển
          </p>
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-200 dark:bg-brand-700" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <span className="text-brand-500 font-bold">{milestone.year}</span>
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-white dark:border-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 