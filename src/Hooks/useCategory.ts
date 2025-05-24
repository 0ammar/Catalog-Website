'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  getGroups,
  getSubOnes,
  getSubTwos,
  getSubThrees,
  uploadGroupImage,
  uploadSubOneImage,
  uploadSubTwoImage,
  uploadSubThreeImage,
  deleteGroupImage,
  deleteSubOneImage,
  deleteSubTwoImage,
  deleteSubThreeImage,
} from '@/Services/groupServices';
import { Group, SubOne, SubTwo, SubThree } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type CategoryItem = Group | SubOne | SubTwo | SubThree;

export default function useCategory(path: string[] = []) {
  const router = useRouter();

  const [groups, setGroups] = useState<Group[]>([]);
  const [subOnes, setSubOnes] = useState<SubOne[]>([]);
  const [subTwos, setSubTwos] = useState<SubTwo[]>([]);
  const [subThrees, setSubThrees] = useState<SubThree[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSubThrees, setHasSubThrees] = useState(false);

  const level = path.length;

  const selectedIds = useMemo(() => {
    const [groupId, subOneId, subTwoId, subThreeId] = path;
    return { groupId, subOneId, subTwoId, subThreeId };
  }, [path]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      switch (level) {
        case 0: {
          const groupsData = await getGroups();
          setGroups(groupsData);
          break;
        }
        case 1: {
          if (selectedIds.groupId) {
            const [groupsData, subOnesData] = await Promise.all([
              getGroups(),
              getSubOnes(selectedIds.groupId),
            ]);
            setGroups(groupsData);
            setSubOnes(subOnesData);
          }
          break;
        }
        case 2: {
          if (selectedIds.groupId && selectedIds.subOneId) {
            const [subOnesData, subTwosData] = await Promise.all([
              getSubOnes(selectedIds.groupId),
              getSubTwos(selectedIds.groupId, selectedIds.subOneId),
            ]);
            setSubOnes(subOnesData);
            setSubTwos(subTwosData);
          }
          break;
        }
        case 3: {
          if (selectedIds.groupId && selectedIds.subOneId && selectedIds.subTwoId) {
            const [subTwosData, subThreesData] = await Promise.all([
              getSubTwos(selectedIds.groupId, selectedIds.subOneId),
              getSubThrees(selectedIds.groupId, selectedIds.subOneId, selectedIds.subTwoId),
            ]);
            setSubTwos(subTwosData);
            setSubThrees(subThreesData);
          }
          break;
        }
      }

      if (
        level === 2 &&
        selectedIds.groupId &&
        selectedIds.subOneId &&
        selectedIds.subTwoId
      ) {
        const subThrees = await getSubThrees(
          selectedIds.groupId,
          selectedIds.subOneId,
          selectedIds.subTwoId
        );
        setHasSubThrees(subThrees.length > 0);
      }
    } catch (err) {
      console.error('❌ Error fetching category data:', err);
    } finally {
      setLoading(false);
    }
  }, [level, selectedIds]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentData: CategoryItem[] = useMemo(() => {
    switch (level) {
      case 0: return groups;
      case 1: return subOnes;
      case 2: return subTwos;
      case 3: return subThrees;
      default: return [];
    }
  }, [level, groups, subOnes, subTwos, subThrees]);

  const selectedCategoryName = useMemo(() => {
    if (level === 1) {
      return groups.find((g) => g.id === selectedIds.groupId)?.name ?? '';
    }
    if (level === 2) {
      return subOnes.find((s) => s.id === selectedIds.subOneId)?.name ?? '';
    }
    if (level === 3) {
      return subTwos.find((s) => s.id === selectedIds.subTwoId)?.name ?? '';
    }
    if (level === 4) {
      return subThrees.find((s) => s.id === selectedIds.subThreeId)?.name ?? '';
    }
    return '';
  }, [level, selectedIds, groups, subOnes, subTwos, subThrees]);

  const shouldShowItems = useMemo(() => (
    (level === 2 && !hasSubThrees && selectedIds.subTwoId) ||
    (level === 3 && selectedIds.subThreeId) ||
    level === 4
  ), [level, hasSubThrees, selectedIds]);

  const handleCategoryClick = async (itemId: string) => {
    const newPath = [...path, itemId];
    if (path.length === 2) {
      try {
        const [groupId, subOneId] = path;
        const subThrees = await getSubThrees(groupId, subOneId, itemId);
        if (subThrees.length > 0) {
          router.push(`/categories/${groupId}/${subOneId}/${itemId}`);
        } else {
          router.push(`/categories/${groupId}/${subOneId}/${itemId}/items`);
        }
      } catch {
        toast.error('❌ Error while checking sub-categories.');
      }
    } else {
      router.push(`/categories/${newPath.join('/')}`);
    }
  };

  const uploadImage = async (file: File, id: string): Promise<void> => {
    switch (level) {
      case 0: await uploadGroupImage(id, file); break;
      case 1: await uploadSubOneImage(id, file); break;
      case 2: await uploadSubTwoImage(id, file); break;
      case 3: await uploadSubThreeImage(id, file); break;
    }
  };

  const deleteImage = async (imageUrl: string, id: string): Promise<void> => {
    const fileName = decodeURIComponent(imageUrl.split('/').pop() ?? '');
    switch (level) {
      case 0: await deleteGroupImage(id, fileName); break;
      case 1: await deleteSubOneImage(id, fileName); break;
      case 2: await deleteSubTwoImage(id, fileName); break;
      case 3: await deleteSubThreeImage(id, fileName); break;
    }
  };

  return {
    level,
    ids: selectedIds,
    data: currentData,
    loading,
    selectedCategoryName,
    shouldShowItems,
    uploadImage,
    deleteImage,
    handleCategoryClick,
    refetch: fetchData,
  };
}
