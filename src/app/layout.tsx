'use client';

import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from '@/context/AuthContext';
import ToastProvider from "@/components/ToastProvider";
import ChatButton from "@/components/chat/ChatButton";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <AuthProvider>
          <ToastProvider />
          <ThemeProvider>
            <SidebarProvider>
              {children}
              <ChatButton />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
