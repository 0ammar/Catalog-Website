'use client';
import styles from './EmptyState.module.scss';
import Image from 'next/image';
import { EmptySearchImg } from '@/assets/images'; 

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = 'لا توجد أصناف مطابقة',
  message = 'حاول البحث باسم أو رقم صنف مختلف.',
}: Props) {
  return (
    <section className={styles.emptyState}>
      <Image
        src={EmptySearchImg}
        alt="No Results"
        width={220}
        height={220}
        className={styles.image}
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </section>
  );
}
