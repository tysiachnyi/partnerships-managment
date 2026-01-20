import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Login } from './Login';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};