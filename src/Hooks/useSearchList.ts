import { useEffect, useState, useRef } from 'react';
import { searchItemsGlobal, getItems, getItemsByStatus } from '@/Services/itemServices';
import { Item } from '@/types/apiTypes';

interface Options {
  groupId?: string;
  subOneId?: string;
  subTwoId?: string;
  subThreeId?: string;
  statusId?: string;
  isGlobal?: boolean;
  pageSize?: number;
}

export default function useSearchList(options: Options) {
  const {
    groupId,
    subOneId,
    subTwoId,
    subThreeId,
    statusId,
    isGlobal = false,
    pageSize = 30,
  } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    setInternalLoading(true);

    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setDebouncedQuery(query.trim());

      setTimeout(() => setInternalLoading(false), 300);
    }, 1000);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) {
        setData([]);
        setHasMore(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let result: Item[] = [];

        if (isGlobal) {
          result = await searchItemsGlobal(debouncedQuery, page);
        } else if (statusId) {
          result = await getItemsByStatus(statusId, page, pageSize);
          result = result.filter(
            (item) =>
              item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              item.itemNo.includes(debouncedQuery)
          );
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

        setData((prev) => (page === 1 ? result : [...prev, ...result]));
        setHasMore(result.length === pageSize);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('حدث خطأ أثناء البحث');
        }
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
    statusId,
    isGlobal,
    pageSize, 
  ]);

  return {
    data,
    query,
    setQuery,
    loading: loading || internalLoading,
    error,
    page,
    setPage,
    hasMore,
    reset: () => {
      setQuery('');
      setDebouncedQuery('');
      setPage(1);
      setData([]);
      setHasMore(true);
    },
  };
}