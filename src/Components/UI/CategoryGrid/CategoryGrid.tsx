'use client';

import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '@/Components/UI';

type CategoryItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type Props = {
  data: CategoryItem[];
  onClick?: (id: string) => void;
  uploadImage?: (file: File, id: string) => void;
  deleteImage?: (url: string, id: string) => void;
  refetch?: () => void;
};

const CategoryGrid = ({ data, onClick, uploadImage, deleteImage }: Props) => {
  return (
    <div className={styles.categoryGrid}>
      {data.map((item) => (
        <CategoryCard
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          onClick={() => onClick?.(item.id)}
          uploadImage={uploadImage ? (file) => uploadImage(file, item.id) : undefined}
          deleteImage={deleteImage ? (url) => deleteImage(url, item.id) : undefined}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
