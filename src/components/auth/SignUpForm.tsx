"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

interface SignUpFormProps {
  onRegister?: (data: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
  }) => Promise<void>;
}

export default function SignUpForm({ onRegister }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
    phone: '',
    role: 'CONSUMER' // Mặc định là người tiêu dùng
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (onRegister) {
      setIsLoading(true);
      try {
        await onRegister(formData);
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col flex-1 lg:w-4/5 w-full">
      <div className="w-full max-w-4xl sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-base text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Quay lại trang chủ
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-4xl mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-md dark:text-white/90 sm:text-title-lg">
              Đăng ký tài khoản
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Điền thông tin để tạo tài khoản mới!
            </p>
          </div>
          <div>
            <div className="grid ">
              <button className="inline-flex items-center justify-center gap-3 py-5 text-lg font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-10 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L5.09444 11.7392L2.33839 13.8295L2.30235 13.9277C3.77058 16.786 6.78645 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Đăng ký với Google
              </button>
             
            </div>
            <div className="relative py-5 sm:py-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-base">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Hoặc
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>
                      Họ và tên <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input 
                      placeholder="Nhập họ và tên" 
                      type="text" 
                      name="fullName"
                      defaultValue={formData.fullName}
                      onChange={handleChange}
                      className="h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input 
                      placeholder="Nhập email" 
                      type="email" 
                      name="email"
                      defaultValue={formData.email}
                      onChange={handleChange}
                      className="h-14 text-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>
                      Số điện thoại <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input 
                      placeholder="Nhập số điện thoại" 
                      type="tel" 
                      name="phone"
                      defaultValue={formData.phone}
                      onChange={handleChange}
                      className="h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Label>
                      Vai trò <span className="text-error-500">*</span>{" "}
                    </Label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full h-14 text-lg rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <option value="CONSUMER">Người tiêu dùng</option>
                      <option value="FARMER">Nông dân</option>
                      <option value="TRANSPORTER">Nhà vận chuyển</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>
                    Tên đăng nhập <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    placeholder="Nhập tên đăng nhập" 
                    type="text" 
                    name="username"
                    defaultValue={formData.username}
                    onChange={handleChange}
                    className="h-14 text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>
                      Mật khẩu <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        name="password"
                        defaultValue={formData.password}
                        onChange={handleChange}
                        className="h-14 text-lg"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>
                      Xác nhận mật khẩu <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        name="confirmPassword"
                        defaultValue={formData.confirmPassword}
                        onChange={handleChange}
                        className="h-14 text-lg"
                      />
                      <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-base dark:text-gray-400">
                    Tôi đồng ý với{" "}
                    <Link
                      href="/terms"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/privacy"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      chính sách bảo mật
                    </Link>
                  </span>
                </div>

                <div>
                  <Button className="w-full h-14 text-lg" size="sm" disabled={isLoading || !isChecked}>
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-base font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Đã có tài khoản? {""}
                <Link
                  href="/login"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
