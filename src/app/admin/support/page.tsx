"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import SupportTicketList from '@/components/admin/support/SupportTicketList';
import { CustomerServiceOutlined } from '@ant-design/icons';

const SupportPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <CustomerServiceOutlined className="text-2xl text-brand-500" />
            <h1 className="text-2xl font-bold text-gray-800">Hỗ trợ người dùng</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <SupportTicketList />
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 