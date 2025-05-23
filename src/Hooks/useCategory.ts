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

  // State for each level of category data
  const [groups, setGroups] = useState<Group[]>([]);
  const [subOnes, setSubOnes] = useState<SubOne[]>([]);
  const [subTwos, setSubTwos] = useState<SubTwo[]>([]);
  const [subThrees, setSubThrees] = useState<SubThree[]>([]);

  const [loading, setLoading] = useState(true);
  const [hasSubThrees, setHasSubThrees] = useState(false);

  const level = path.length;

  // Extract selected IDs based on the path
  const selectedIds = useMemo(() => {
    const [groupId, subOneId, subTwoId, subThreeId] = path;
    return { groupId, subOneId, subTwoId, subThreeId };
  }, [path]);

  // Fetch category data based on current level
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      switch (level) {
        case 0:
          setGroups(await getGroups());
          break;
        case 1:
          if (selectedIds.groupId) {
            setSubOnes(await getSubOnes(selectedIds.groupId));
          }
          break;
        case 2:
          if (selectedIds.groupId && selectedIds.subOneId) {
            setSubTwos(await getSubTwos(selectedIds.groupId, selectedIds.subOneId));
          }
          break;
        case 3:
          if (selectedIds.groupId && selectedIds.subOneId && selectedIds.subTwoId) {
            setSubThrees(await getSubThrees(selectedIds.groupId, selectedIds.subOneId, selectedIds.subTwoId));
          }
          break;
        default:
          break;
      }

      // Check if subThrees exist when we're on level 2
      if (level === 2 && selectedIds.groupId && selectedIds.subOneId && selectedIds.subTwoId) {
        const subThrees = await getSubThrees(
          selectedIds.groupId,
          selectedIds.subOneId,
          selectedIds.subTwoId
        );
        setHasSubThrees(subThrees.length > 0);
      }
    } catch (err: unknown) {
      console.error('❌ Error fetching category data:', err);
    } finally {
      setLoading(false);
    }
  }, [level, selectedIds]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Determine which data to show based on current level
  const currentData: CategoryItem[] = useMemo(() => {
    switch (level) {
      case 0: return groups;
      case 1: return subOnes;
      case 2: return subTwos;
      case 3: return subThrees;
      default: return [];
    }
  }, [level, groups, subOnes, subTwos, subThrees]);

  // Dynamically determine category title
  const selectedCategoryName = useMemo(() => {
    switch (level) {
      case 1: return groups.find((g) => g.id === selectedIds.groupId)?.name;
      case 2: return subOnes.find((s) => s.id === selectedIds.subOneId)?.name;
      case 3: return subTwos.find((s) => s.id === selectedIds.subTwoId)?.name;
      default: return undefined;
    }
  }, [level, selectedIds, groups, subOnes, subTwos]);

  // Decide whether we should show items under this path
  const shouldShowItems = useMemo(() => (
    (level === 2 && !hasSubThrees && selectedIds.subTwoId) ||
    (level === 3 && selectedIds.subThreeId) ||
    level === 4
  ), [level, hasSubThrees, selectedIds]);

  // Handle click on a category card (navigation logic)
  const handleCategoryClick = async (itemId: string) => {
    const newPath = [...path, itemId];

    // If we are on SubTwo, check if SubThrees exist
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

  // Upload image handler
  const uploadImage = async (file: File, id: string) => {
    switch (level) {
      case 0: return await uploadGroupImage(id, file);
      case 1: return await uploadSubOneImage(id, file);
      case 2: return await uploadSubTwoImage(id, file);
      case 3: return await uploadSubThreeImage(id, file);
      default: return false;
    }
  };

  // Delete image handler
  const deleteImage = async (imageUrl: string, id: string) => {
    const fileName = decodeURIComponent(imageUrl.split('/').pop() ?? '');
    switch (level) {
      case 0: return await deleteGroupImage(id, fileName);
      case 1: return await deleteSubOneImage(id, fileName);
      case 2: return await deleteSubTwoImage(id, fileName);
      case 3: return await deleteSubThreeImage(id, fileName);
      default: return false;
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
