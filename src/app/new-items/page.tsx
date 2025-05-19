'use client';

import { useEffect, useState } from 'react';
import { ItemsPage } from '@/Components/Layout';
import { newItems } from '@/mockData';
import Loading from '@/Components/UI/Loading/LoadingClient';;
import { ItemCardProps } from '../../../types/itemComponent';

const NewItemsPage =() => {
  const [items, setItems] = useState<ItemCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(newItems);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <ItemsPage title="العناصر الجديدة" items={items} />
  );
}

export default NewItemsPage