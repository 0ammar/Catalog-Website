'use client';

import { useEffect, useState } from 'react';
import { getItems, getItemsByStatus } from '@/Services/itemServices';
import { Item } from '@/types/apiTypes';

interface Params {
  groupId?: string;
  subOneId?: string;
  subTwoId?: string;
  subThreeId?: string;
  statusId?: string;
  pageSize?: number;
  page?: number; 
}

export default function useItemLogic({
  groupId,
  subOneId,
  subTwoId,
  subThreeId,
  statusId,
  pageSize = 30,
  page: initialPage = 1,
}: Params) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const fetchItems = async () => {
      const shouldFetchByStatus = Boolean(statusId);
      const shouldFetchByCategory = groupId && subOneId;

      if (!shouldFetchByStatus && !shouldFetchByCategory) {
        setData([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let result: Item[] = [];

        if (shouldFetchByStatus) {
          result = await getItemsByStatus(statusId!, page, pageSize);
        } else if (shouldFetchByCategory) {
          result = await getItems(groupId!, subOneId!, subTwoId, subThreeId, page, pageSize);
        }

        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب العناصر');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [groupId, subOneId, subTwoId, subThreeId, statusId, page, pageSize]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
  };
}