import { useEffect, useState } from 'react';
import { ItemCardProps } from '../../types/itemComponent'; 
import { newItems, focusedItems } from '@/mockData';

const allItems: ItemCardProps[] = [...newItems, ...focusedItems];

export default function useSearchList(query: string) {
  const [results, setResults] = useState<ItemCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const filtered = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.itemNumber.toString().includes(query)
      );

      setResults(filtered);
      setLoading(false);
    }, 200); 

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
