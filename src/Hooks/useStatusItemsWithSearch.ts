'use client';

import { useState, useEffect, useRef } from 'react';
import useItemLogic from './useItemLogic';
import { Item } from '@/types/apiTypes';

export default function useStatusItemsWithSearch(statusId: string, pageSize = 30) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: fetchedItems, loading: dataLoading } = useItemLogic({
    statusId,
    pageSize,
    page,
  });

  useEffect(() => {
    if (!query) setFilteredItems(fetchedItems);
  }, [fetchedItems, query]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalLoading(true);

    debounceRef.current = setTimeout(() => {
      const term = query.trim().toLowerCase();
      if (!term) {
        setFilteredItems(fetchedItems);
      } else {
        const results = fetchedItems.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.itemNo.includes(term)
        );
        setFilteredItems(results);
      }
      setLocalLoading(false);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchedItems]);

  return {
    query,
    setQuery,
    page,
    setPage,
    items: filteredItems,
    loading: dataLoading || localLoading,
    total: fetchedItems.length,
  };
}
