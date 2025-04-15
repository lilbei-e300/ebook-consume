import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        const redirectPath = getRoleDashboard(user.role);
        router.push(redirectPath);
      }
    }
  }, [isAuthenticated, user, router, allowedRoles, isLoading]);

  const getRoleDashboard = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'farmer':
        return '/farmer/dashboard';
      case 'transporter':
        return '/transporter/dashboard';
      case 'consumer':
        return '/';
      default:
        return '/';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
} 