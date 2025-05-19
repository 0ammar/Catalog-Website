'use client';

import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '@/Components/UI';
import { Group } from '@/types/apiTypes';

type Props = {
  data: Group[]; 
};

const CategoryGrid = ({ data }: Props) => {
  return (
    <div className={styles.categoryGrid}>
      {data.map((group, index) => (
        <CategoryCard key={group.id || index} group={group} />
      ))}
    </div>
  );
};

export default CategoryGrid;
