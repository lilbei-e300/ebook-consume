'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { paymentService } from '@/services/paymentService';
import { toast } from 'react-hot-toast';

function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      try {
        const result = await paymentService.handleVNPayReturn(searchParams);
        
        if (result.code === 200) {
          toast.success(result.message);
          router.push('/orders');
        } else {
          toast.error(result.message);
          router.push('/cart');
        }
      } catch (error) {
        console.error('Lỗi khi xử lý kết quả thanh toán:', error);
        toast.error(error instanceof Error ? error.message : 'Không thể xử lý kết quả thanh toán');
        router.push('/cart');
      } finally {
        setLoading(false);
      }
    };

    handlePaymentReturn();
  }, [searchParams, router]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đang xử lý kết quả thanh toán...
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Vui lòng đợi trong giây lát
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
} 