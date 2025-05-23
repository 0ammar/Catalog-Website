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
  query?: string;
  page?: number;
}

export default function useItemLogic({
  groupId,
  subOneId,
  subTwoId,
  subThreeId,
  statusId,
  pageSize = 30,
  query,
  page = 1,
}: Params) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (query) return;

      setLoading(true);
      setError(null);

      try {
        let result: Item[] = [];

        if (statusId) {
          result = await getItemsByStatus(statusId, page, pageSize);
        } else if (groupId && subOneId) {
          result = await getItems(
            groupId,
            subOneId,
            subTwoId,
            subThreeId,
            page,
            pageSize
          );
        }

        console.log("🧠 العناصر الراجعة من API:");
        console.table(result.map((item) => ({
          itemNo: item.itemNo,
          name: item.name,
          status: item.status?.code || 'بدون حالة'
        })));

        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('حدث خطأ أثناء جلب العناصر');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [groupId, subOneId, subTwoId, subThreeId, statusId, page, pageSize, query]);

  return {
    data,
    loading,
    error,
  };
}