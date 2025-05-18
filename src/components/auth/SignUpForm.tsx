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
  );
}
