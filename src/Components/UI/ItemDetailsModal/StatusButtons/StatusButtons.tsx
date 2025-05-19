'use client';

import styles from './StatusButtons.module.scss';
import { HiOutlineCheck, HiOutlineHeart, HiOutlineBan, HiOutlineSparkles } from 'react-icons/hi';

type StatusType = 'New' | 'Focused' | 'Active' | 'InActive';

type Props = {
  itemId: string;
  status: StatusType;
  onStatusChange?: (newStatus: StatusType) => void;
};

const statusOptions: { key: StatusType; icon: React.ReactNode; title: string }[] = [
  { key: 'Active', icon: <HiOutlineCheck />, title: 'Active' },
  { key: 'InActive', icon: <HiOutlineBan />, title: 'InActive' },
  { key: 'New', icon: <HiOutlineSparkles />, title: 'New' },
  { key: 'Focused', icon: <HiOutlineHeart />, title: 'Focused' },
];

const StatusButtons = ({ itemId, status, onStatusChange }: Props) => {
  const handleClick = (newStatus: StatusType) => {
    console.log(`Item ${itemId} changed to ${newStatus}`);
    onStatusChange?.(newStatus);
  };

  return (
    <div className={styles.statusButtons}>
      {statusOptions.map(({ key, icon, title }) => (
        <button
          key={key}
          className={`${styles.iconBtn} ${status === key ? styles.active : ''}`}
          title={title}
          onClick={() => handleClick(key)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
export default StatusButtons