'use client';

import styles from './Pagination.module.scss';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

type Props = {
  page: number;
  pageSize: number;
  currentCount: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pageSize, currentCount, onPageChange }: Props) => {
  const start = (page - 1) * pageSize + 1;
  const end = start + currentCount - 1;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowBtn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <FiChevronLeft />
      </button>

      <span className={styles.pageInfo}>
        {start} - {end}
      </span>

      <button
        className={styles.arrowBtn}
        onClick={() => onPageChange(page + 1)}
        disabled={currentCount < pageSize}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
