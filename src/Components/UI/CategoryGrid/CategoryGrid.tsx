'use client';

import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/Loading';

type CategoryItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type Props = {
  data: CategoryItem[];
  loading?: boolean;
  onClick?: (id: string) => void;
  uploadImage?: (file: File, id: string) => Promise<void>;
  deleteImage?: (url: string, id: string) => Promise<void>;
  refetch?: () => void;
  isAdmin?: boolean;
};

const CategoryGrid = ({
  data,
  loading = false,
  onClick,
  uploadImage,
  deleteImage,
  refetch,
  isAdmin,
}: Props) => {
  if (loading) return <Loading />;

  return (
    <div className={styles.categoryGrid}>
      {data.map((item) => (
        <CategoryCard
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          onClick={() => onClick?.(item.id)}
          isAdmin={isAdmin}
          uploadImage={uploadImage ? (file) => uploadImage(file, item.id) : undefined}
          deleteImage={deleteImage ? (url) => deleteImage(url, item.id) : undefined}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;