'use client';

import styles from './CategoryCard.module.scss';
import Image from 'next/image';
import { FiUploadCloud, FiRefreshCw } from 'react-icons/fi';
import { Group } from '@/types/apiTypes';

type Props = {
  group: Group;
};

const CategoryCard = ({ group }: Props) => {
  return (
    <section className={styles.categoryCard}>
      <div className={styles.imgTitle}>
        <Image
          className={styles.categImg}
          src={group.imageUrl}
          alt={group.name}
          width={100}
          height={100}
        />
        <h2 className={styles.categTitle}>{group.name}</h2>
      </div>
      <div className={styles.buttonsWrapper}>
        <FiRefreshCw className={styles.icon} title="Reset" />
        <FiUploadCloud className={styles.icon} title="Upload" />
      </div>
    </section>
  );
};

export default CategoryCard;
