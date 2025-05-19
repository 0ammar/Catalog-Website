'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/Components/UI/Loading/Loading';

const RouteLoading = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <Loading /> : <>{children}</>;
};

export default RouteLoading;
