'use client';

import styles from './CategoryGrid.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CategoryCard } from '@/Components/UI';
import { getSubThrees } from '@/Services/groupServices';

const getImageFileName = (url: string) => url.split('/').pop() ?? '';

type CategoryItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type Props = {
  data: CategoryItem[];
  path: string[];
  uploadImage?: (file: File, id: string) => Promise<boolean>;
  deleteImage?: (url: string, id: string) => Promise<boolean>;
  refetch?: () => void;
};

const CategoryGrid = ({ data, path, uploadImage, deleteImage, refetch }: Props) => {
  const router = useRouter();

  const handleNavigate = async (itemId: string) => {
    const newPath = [...path, itemId];

    if (path.length === 2) {
      const [groupId, subOneId] = path;
      const subTwoId = itemId;

      try {
        const subThrees = await getSubThrees(groupId, subOneId, subTwoId);

        if (subThrees.length > 0) {
          router.push(`/categories/${groupId}/${subOneId}/${subTwoId}`);
        } else {
          router.push(`/categories/${groupId}/${subOneId}/${subTwoId}/items`);
        }
      } catch {
        toast.error('حدث خطأ أثناء التحقق من التصنيفات الفرعية');
      }
    } else {
      router.push(`/categories/${newPath.join('/')}`);
    }
  };

  const handleUpload = async (file: File, id: string) => {
    if (!uploadImage) return;

    const success = await uploadImage(file, id);
    if (success) {
      toast.success('✅ تم رفع الصورة بنجاح');
      refetch?.();
    } else {
      toast.error('❌ فشل في رفع الصورة');
    }
  };

  const handleDelete = async (url: string, id: string) => {
    if (!deleteImage) return;

    const imageFileName = decodeURIComponent(getImageFileName(url));
    const success = await deleteImage(imageFileName, id);
    if (success) {
      toast.success('تم حذف الصورة');
      refetch?.();
    } else {
      toast.error('فشل في حذف الصورة');
    }
  };

  return (
    <div className={styles.categoryGrid}>
      {data.map((item) => (
        <CategoryCard
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          onClick={() => handleNavigate(item.id)}
          uploadImage={uploadImage ? (file) => handleUpload(file, item.id) : undefined}
          deleteImage={deleteImage ? (url) => handleDelete(url, item.id) : undefined}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
