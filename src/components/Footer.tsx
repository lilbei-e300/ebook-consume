export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Về chúng tôi
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              E-Book Consume là nền tảng kết nối người tiêu dùng với các sản phẩm nông nghiệp chất lượng cao.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: support@ebookconsume.com</li>
              <li>Điện thoại: 0123 456 789</li>
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} E-Book Consume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 