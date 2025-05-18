"use client";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

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
      const response = await register(data);
      if (response.code === 201) {
        toast.success('Đăng ký thành công! Vui lòng đợi tài khoản được duyệt.', {
          duration: 5000,
          position: 'top-center',
        });
        router.push("/login");
      }
    } catch (error: unknown) {
      console.error("Lỗi đăng ký:", error);
      setError(error instanceof Error ? error.message : 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col flex-1 lg:w-1/2">
            {error && (
              <div className="w-full max-w-4xl mx-auto mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            <SignUpForm onRegister={handleRegister} />
          </div>
          
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Chào mừng đến với E-Book Consume
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Nền tảng kết nối nông dân và người tiêu dùng
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 