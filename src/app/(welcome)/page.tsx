'use client';
import { useEffect, useState } from 'react';
import Loading from '@/Components/UI/Loading/LoadingClient';

export default function Welcome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ padding: 300, margin: 'auto', textAlign: 'center', fontSize: 40 }}>
      Welcome
    </div>
  );
}
