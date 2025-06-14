import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/Services/authServices';

export default function useAuth() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(`This is the payload: ${payload}`)
      const adminStatus = payload?.role === 'Admin';
      setIsAdmin(adminStatus);
      localStorage.setItem('isAdmin', JSON.stringify(adminStatus));
    } catch {
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = await login({ username, password });
      localStorage.setItem('token', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const adminStatus = payload?.role === 'Admin';
      setIsAdmin(adminStatus);
      localStorage.setItem('isAdmin', JSON.stringify(adminStatus));

      router.push('/categories');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: unknown } }).response?.data === 'string'
      ) {
        const msg = (err as { response: { data: string } }).response.data;
        if (msg.includes('Invalid')) {
          setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        } else {
          setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.');
        }
      } else {
        setError('فشل الاتصال بالخادم.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, isAdmin };
}
