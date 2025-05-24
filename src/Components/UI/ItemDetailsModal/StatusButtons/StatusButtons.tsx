'use client';

import styles from './StatusButtons.module.scss';
import Image from 'next/image';
import { ItemStatuses } from '@/types/apiTypes';

interface Props {
  status?: string;
  statuses: ItemStatuses[];
  loading: boolean;
  onChange: (code: string) => void;
}

const StatusButtons = ({ status, statuses, loading, onChange }: Props) => {
  return (
    <div className={styles.statusButtons}>
      {statuses.map((s) => {
        const isActive = status?.toLowerCase() === s.code.toLowerCase();

        return (
          <button
            key={s.id}
            title={s.name}
            disabled={loading}
            onClick={() => onChange(s.id)}
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