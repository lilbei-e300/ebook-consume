"use client";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/register"
              className="inline-flex items-center text-base text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Quay lại trang đăng ký
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Chính sách bảo mật
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  1. Thông tin chúng tôi thu thập
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Thông tin cá nhân:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Họ và tên</li>
                      <li>Địa chỉ email</li>
                      <li>Số điện thoại</li>
                      <li>Địa chỉ</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Thông tin tài khoản:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Tên đăng nhập</li>
                      <li>Mật khẩu (được mã hóa)</li>
                      <li>Vai trò người dùng</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  2. Cách chúng tôi sử dụng thông tin
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cung cấp và duy trì dịch vụ</li>
                  <li>Xác thực và bảo mật tài khoản</li>
                  <li>Giao tiếp với người dùng</li>
                  <li>Cải thiện trải nghiệm người dùng</li>
                  <li>Tuân thủ các yêu cầu pháp lý</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  3. Bảo mật thông tin
                </h2>
                <p className="mb-4">
                  Chúng tôi cam kết bảo vệ thông tin của bạn bằng cách:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sử dụng mã hóa cho dữ liệu nhạy cảm</li>
                  <li>Giới hạn quyền truy cập vào thông tin cá nhân</li>
                  <li>Thường xuyên cập nhật các biện pháp bảo mật</li>
                  <li>Giám sát và phát hiện các hoạt động bất thường</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  4. Chia sẻ thông tin
                </h2>
                <p className="mb-4">
                  Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ trong các trường hợp:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Với sự đồng ý của bạn</li>
                  <li>Để tuân thủ yêu cầu pháp lý</li>
                  <li>Để bảo vệ quyền lợi của chúng tôi và người dùng khác</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  5. Quyền của người dùng
                </h2>
                <p className="mb-4">
                  Bạn có quyền:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Truy cập và xem thông tin cá nhân của mình</li>
                  <li>Yêu cầu sửa đổi thông tin không chính xác</li>
                  <li>Yêu cầu xóa tài khoản và dữ liệu cá nhân</li>
                  <li>Rút lại sự đồng ý về việc xử lý dữ liệu</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  6. Cập nhật chính sách
                </h2>
                <p>
                  Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên nền tảng.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 