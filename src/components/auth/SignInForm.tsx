"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

interface SignInFormProps {
  onLogin?: (usernameOrEmail: string, password: string) => Promise<void>;
}

export default function SignInForm({ onLogin }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      setIsLoading(true);
      try {
        await onLogin(usernameOrEmail, password);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="w-full sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Quay lại trang chủ
        </Link>
      </div>
      
      <div>
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-md dark:text-white/90 sm:text-title-lg">
            Đăng nhập
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nhập tên đăng nhập và mật khẩu để đăng nhập!
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div>
                <Label>
                  Tên đăng nhập hoặc Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Input 
                  placeholder="Nhập tên đăng nhập hoặc email" 
                  type="text" 
                  defaultValue={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              
              <div>
                <Label>
                  Mật khẩu <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Ghi nhớ đăng nhập
                  </span>
                </div>
                <Link
                  href="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              
              <div>
                <Button className="w-full h-12 text-base" size="sm" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Chưa có tài khoản? {""}
              <Link
                href="/register"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
