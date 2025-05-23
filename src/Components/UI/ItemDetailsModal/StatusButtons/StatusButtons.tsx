'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from './StatusButtons.module.scss';

import { getItemStatuses, updateItemStatus } from '@/Services/itemServices';
import { ItemStatuses } from '@/types/apiTypes';

type Props = {
  itemId: string;
  status?: string;
  onStatusChange?: (newStatus: ItemStatuses) => void;
};

const StatusButtons = ({ itemId, status, onStatusChange }: Props) => {
  const [statuses, setStatuses] = useState<ItemStatuses[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getItemStatuses();
        console.log('📥 Available statuses:', data);
        setStatuses(data);
      } catch {
        toast.error('❌ فشل في تحميل الحالات');
      }
    })();
  }, []);

  const handleUpdate = async (code: string) => {
    if (loading || code === status) return;

    setLoading(true);
    try {
      console.log('🔄 Updating status for:', itemId, 'to code:', code);
      await updateItemStatus(itemId, code);
      const updatedStatus = statuses.find((s) => s.code === code);
      console.log('📤 Sent to onStatusChange:', updatedStatus);
      if (updatedStatus) onStatusChange?.(updatedStatus);
      toast.success('✅ تم تحديث الحالة');
    } catch (error) {
      console.error('❌ Error in handleUpdate:', error);
      toast.error('❌ فشل في تحديث الحالة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.statusButtons}>
      {statuses.map((s) => {
        const isActive = status?.toLowerCase() === s.code.toLowerCase();

        return (
          <button
            key={s.id}
            title={s.name}
            disabled={loading}
            onClick={() => handleUpdate(s.code)}
            className={`${styles.iconBtn} ${isActive ? styles.active : ''}`}
          >
            <Image
              src={s.iconUrl}
              alt={s.name}
              width={20}
              height={20}
              unoptimized
            />
          </button>
        );
      })}
    </div>
  );
};

export default StatusButtons;
