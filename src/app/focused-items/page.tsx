'use client';

import { useEffect, useState } from 'react';
import { ItemsPage } from '@/Components/Layout';
import { focusedItems } from '@/mockData';
import Loading from '@/Components/UI/Loading/LoadingClient';
import { ItemCardProps } from '../../../types/itemComponent';

const FocusedItems = () => {
  const [items, setItems] = useState<ItemCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(focusedItems);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <ItemsPage title="العناصر المميزة" items={items} />
  );
}

export default FocusedItems