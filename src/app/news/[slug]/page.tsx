"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const newsData = {
  "smart-farming-2025": {
    title: "Xu hướng nông nghiệp thông minh 2025",
    date: "15/03/2025",
    category: "Công nghệ",
    image: "https://picsum.photos/seed/smart-farming-2025/1200/800",
    content: `
      <p class="mb-4">Năm 2025 đánh dấu một bước ngoặt lớn trong ngành nông nghiệp Việt Nam với sự phát triển mạnh mẽ của công nghệ thông minh. Các giải pháp AI và IoT đang thay đổi hoàn toàn cách thức canh tác truyền thống, mang lại hiệu quả và năng suất cao hơn cho người nông dân.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Công nghệ AI trong nông nghiệp</h2>
      <p class="mb-4">Các hệ thống AI đang được ứng dụng rộng rãi trong việc:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Phân tích dữ liệu thời tiết và đất đai</li>
        <li>Dự đoán sâu bệnh và dịch hại</li>
        <li>Tối ưu hóa quy trình tưới tiêu</li>
        <li>Quản lý năng suất cây trồng</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. IoT và tự động hóa</h2>
      <p class="mb-4">Hệ thống IoT đang giúp nông dân:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Giám sát môi trường canh tác 24/7</li>
        <li>Tự động hóa quy trình chăm sóc</li>
        <li>Tiết kiệm nước và phân bón</li>
        <li>Tăng năng suất và chất lượng sản phẩm</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Lợi ích và thách thức</h2>
      <p class="mb-4">Việc áp dụng công nghệ thông minh mang lại nhiều lợi ích nhưng cũng đặt ra không ít thách thức cho nông dân Việt Nam. Tuy nhiên, với sự hỗ trợ từ chính phủ và các tổ chức, ngành nông nghiệp đang dần chuyển mình mạnh mẽ.</p>
    `
  },
  "clean-farming-standards-2025": {
    title: "Nông sản sạch: Tiêu chuẩn mới 2025",
    date: "10/03/2025",
    category: "Tiêu chuẩn",
    image: "https://picsum.photos/seed/clean-farming-2025/1200/800",
    content: `
      <p class="mb-4">Bộ tiêu chuẩn mới về nông sản sạch sẽ chính thức được áp dụng từ năm 2025, đánh dấu một bước tiến quan trọng trong việc nâng cao chất lượng nông sản Việt Nam. Đây là kết quả của quá trình nghiên cứu và tham khảo các tiêu chuẩn quốc tế, đồng thời phù hợp với điều kiện thực tế của nền nông nghiệp Việt Nam.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Các tiêu chuẩn mới</h2>
      <p class="mb-4">Bộ tiêu chuẩn mới bao gồm nhiều quy định chi tiết về:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Quy định về sử dụng thuốc bảo vệ thực vật</li>
        <li>Tiêu chuẩn về phân bón hữu cơ</li>
        <li>Quy trình canh tác an toàn</li>
        <li>Tiêu chuẩn về bao bì và bảo quản</li>
        <li>Quy định về truy xuất nguồn gốc</li>
        <li>Tiêu chuẩn về môi trường canh tác</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Tác động đến người sản xuất</h2>
      <p class="mb-4">Các nhà sản xuất cần thực hiện nhiều thay đổi để đáp ứng tiêu chuẩn mới:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Cập nhật quy trình sản xuất theo tiêu chuẩn mới</li>
        <li>Đầu tư công nghệ và thiết bị hiện đại</li>
        <li>Đào tạo và nâng cao kỹ năng cho nhân lực</li>
        <li>Xây dựng hệ thống truy xuất nguồn gốc</li>
        <li>Thực hiện các biện pháp bảo vệ môi trường</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Lợi ích cho người tiêu dùng</h2>
      <p class="mb-4">Người tiêu dùng sẽ được hưởng nhiều lợi ích từ bộ tiêu chuẩn mới:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Sản phẩm an toàn và chất lượng cao hơn</li>
        <li>Thông tin minh bạch về nguồn gốc và quy trình sản xuất</li>
        <li>Đa dạng lựa chọn sản phẩm đạt chuẩn</li>
        <li>Giá cả hợp lý và ổn định</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Hỗ trợ từ chính phủ</h2>
      <p class="mb-4">Để giúp người sản xuất đáp ứng tiêu chuẩn mới, chính phủ đã triển khai nhiều chính sách hỗ trợ:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Chương trình đào tạo và tập huấn</li>
        <li>Hỗ trợ vốn đầu tư công nghệ</li>
        <li>Chính sách ưu đãi thuế</li>
        <li>Hỗ trợ xúc tiến thương mại</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Kế hoạch triển khai</h2>
      <p class="mb-4">Bộ tiêu chuẩn mới sẽ được triển khai theo lộ trình cụ thể:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Giai đoạn 1 (Q1/2025): Tập huấn và hướng dẫn</li>
        <li>Giai đoạn 2 (Q2/2025): Thí điểm tại một số địa phương</li>
        <li>Giai đoạn 3 (Q3/2025): Mở rộng phạm vi áp dụng</li>
        <li>Giai đoạn 4 (Q4/2025): Áp dụng toàn diện</li>
      </ul>
    `
  },
  "organic-market-2025": {
    title: "Thị trường nông sản hữu cơ 2025",
    date: "05/03/2025",
    category: "Thị trường",
    image: "https://picsum.photos/seed/organic-market-2025/1200/800",
    content: `
      <p class="mb-4">Thị trường nông sản hữu cơ Việt Nam đang bước vào giai đoạn phát triển mạnh mẽ, với dự báo tăng trưởng ấn tượng trong năm 2025. Theo báo cáo mới nhất, thị trường này dự kiến đạt giá trị 500 triệu USD, tăng 30% so với năm 2024.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Xu hướng thị trường</h2>
      <p class="mb-4">Các xu hướng chính đang định hình thị trường nông sản hữu cơ:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Tăng trưởng doanh số 30% mỗi năm</li>
        <li>Mở rộng thị trường xuất khẩu sang EU và Nhật Bản</li>
        <li>Phát triển kênh phân phối trực tuyến</li>
        <li>Đa dạng hóa sản phẩm hữu cơ</li>
        <li>Tăng cường chứng nhận quốc tế</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Cơ hội cho nông dân</h2>
      <p class="mb-4">Nông dân có nhiều cơ hội phát triển trong thị trường hữu cơ:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Hỗ trợ từ chính phủ và các tổ chức quốc tế</li>
        <li>Chứng nhận hữu cơ quốc tế (USDA, EU Organic)</li>
        <li>Kết nối trực tiếp với người tiêu dùng</li>
        <li>Giá bán cao hơn 20-30% so với sản phẩm thông thường</li>
        <li>Thị trường xuất khẩu rộng mở</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Thách thức và giải pháp</h2>
      <p class="mb-4">Để phát triển bền vững, ngành nông nghiệp hữu cơ cần giải quyết các thách thức:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Nâng cao chất lượng sản phẩm</li>
        <li>Xây dựng thương hiệu mạnh</li>
        <li>Đầu tư công nghệ sản xuất</li>
        <li>Phát triển chuỗi cung ứng</li>
        <li>Đào tạo nhân lực chuyên môn</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Phân khúc thị trường</h2>
      <p class="mb-4">Thị trường nông sản hữu cơ được chia thành các phân khúc chính:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Rau củ quả hữu cơ (40% thị phần)</li>
        <li>Gạo và ngũ cốc hữu cơ (25% thị phần)</li>
        <li>Trái cây hữu cơ (20% thị phần)</li>
        <li>Các sản phẩm khác (15% thị phần)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Kênh phân phối</h2>
      <p class="mb-4">Các kênh phân phối chính cho nông sản hữu cơ:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Siêu thị và cửa hàng chuyên biệt (45%)</li>
        <li>Thương mại điện tử (30%)</li>
        <li>Xuất khẩu (15%)</li>
        <li>Kênh phân phối khác (10%)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Dự báo tương lai</h2>
      <p class="mb-4">Theo các chuyên gia, thị trường nông sản hữu cơ Việt Nam sẽ tiếp tục tăng trưởng mạnh trong 5 năm tới, với các điểm đáng chú ý:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Tăng trưởng trung bình 25-30% mỗi năm</li>
        <li>Mở rộng thị trường xuất khẩu</li>
        <li>Phát triển công nghệ sản xuất</li>
        <li>Tăng cường hợp tác quốc tế</li>
      </ul>
    `
  }
};

export default function NewsDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const news = newsData[slug as keyof typeof newsData];

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Không tìm thấy bài viết</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại trang chủ
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-brand-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {news.category}
              </span>
              <time className="text-gray-500 dark:text-gray-400">{news.date}</time>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {news.title}
            </h1>

            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
} 