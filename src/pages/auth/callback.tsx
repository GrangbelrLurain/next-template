import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export default function AuthCallback() {
  const router = useRouter();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const token = handleAuthCallback();
    if (token) {
      // 토큰이 있으면 메인 페이지로 이동
      router.push('/');
    }
  }, []);

  return <div>로그인 처리중...</div>;
}
