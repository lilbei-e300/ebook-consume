"use client";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
  }) => {
    try {
      await register(data);
      router.push("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1 items-center pb-4">
        <SignUpForm onRegister={handleRegister} />
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center justify-center h-full p-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Chào mừng đến với E-Book Consume
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Nền tảng kết nối nông dân, người tiêu dùng và nhà vận chuyển
            </p>
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Người tiêu dùng
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mua sản phẩm tươi ngon trực tiếp từ nông dân
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Nông dân
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bán sản phẩm trực tiếp cho người tiêu dùng
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Nhà vận chuyển
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Vận chuyển sản phẩm từ nông dân đến người tiêu dùng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 