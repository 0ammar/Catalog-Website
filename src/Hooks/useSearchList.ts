'use client';

import { useEffect, useRef, useState } from 'react';
import { getItems, searchItemsGlobal } from '@/Services/itemServices';
import { Item } from '@/types/apiTypes';

interface Options {
  groupId?: string;
  subOneId?: string;
  subTwoId?: string;
  subThreeId?: string;
  isGlobal?: boolean;
  pageSize?: number;
}

export default function useSearchList({
  groupId,
  subOneId,
  subTwoId,
  subThreeId,
  isGlobal = false,
  pageSize = 30,
}: Options) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle query debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setPage(1);
      setDebouncedQuery(query.trim());
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Fetch items on debouncedQuery or page
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) {
        setItems([]);
        setHasMore(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let result: Item[] = [];

        if (isGlobal) {
          result = await searchItemsGlobal(debouncedQuery, page);
        } else if (groupId && subOneId) {
          result = await getItems(
            groupId,
            subOneId,
            subTwoId,
            subThreeId,
            page,
            pageSize,
            debouncedQuery
          );
        }

        setItems((prev) => (page === 1 ? result : [...prev, ...result]));
        setHasMore(result.length === pageSize);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ أثناء البحث');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    debouncedQuery,
    page,
    groupId,
    subOneId,
    subTwoId,
    subThreeId,
    isGlobal,
    pageSize,
  ]);

  return {
    query,
    setQuery,
    items,
    loading,
    error,
    page,
    setPage,
    hasMore,
    reset: () => {
      setQuery('');
      setDebouncedQuery('');
      setPage(1);
      setItems([]);
      setHasMore(true);
    },
  };
}
