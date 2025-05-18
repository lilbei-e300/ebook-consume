"use client";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React from "react";

export default function TermsPage() {
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
              Điều khoản sử dụng
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  1. Điều khoản chung
                </h2>
                <p className="mb-4">
                  Bằng việc truy cập và sử dụng nền tảng E-Book Consume, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện sau đây.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  2. Tài khoản người dùng
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản</li>
                  <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình</li>
                  <li>Mỗi người chỉ được đăng ký một tài khoản</li>
                  <li>Chúng tôi có quyền từ chối hoặc chấm dứt tài khoản vi phạm điều khoản</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  3. Quyền và nghĩa vụ
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Đối với người tiêu dùng:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Được mua sản phẩm trực tiếp từ nông dân</li>
                      <li>Được đánh giá và phản hồi về chất lượng sản phẩm</li>
                      <li>Phải thanh toán đầy đủ và đúng hạn</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Đối với nông dân:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Được bán sản phẩm trực tiếp cho người tiêu dùng</li>
                      <li>Phải cung cấp thông tin chính xác về sản phẩm</li>
                      <li>Đảm bảo chất lượng và an toàn thực phẩm</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  4. Giới hạn trách nhiệm
                </h2>
                <p className="mb-4">
                  E-Book Consume không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng dịch vụ, bao gồm nhưng không giới hạn ở:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Thông tin không chính xác từ người dùng</li>
                  <li>Chất lượng sản phẩm</li>
                  <li>Giao dịch giữa người mua và người bán</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  5. Thay đổi điều khoản
                </h2>
                <p>
                  Chúng tôi có quyền thay đổi điều khoản sử dụng này vào bất kỳ lúc nào. Những thay đổi sẽ có hiệu lực ngay khi được đăng tải trên nền tảng.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 