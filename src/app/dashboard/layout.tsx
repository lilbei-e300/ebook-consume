"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Kiểm tra quyền truy cập
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Kiểm tra role có quyền truy cập
    const allowedRoles = ['admin', 'farmer', 'transporter'];
    if (!user || !allowedRoles.includes(user.role)) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  // Nếu chưa xác thực hoặc không có quyền truy cập, hiển thị loading
  if (!isAuthenticated || !user || !['admin', 'farmer', 'transporter'].includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}

