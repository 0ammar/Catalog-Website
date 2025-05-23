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

export default function useCategory(path: string[] = []) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [subOnes, setSubOnes] = useState<SubOne[]>([]);
  const [subTwos, setSubTwos] = useState<SubTwo[]>([]);
  const [subThrees, setSubThrees] = useState<SubThree[]>([]);
  const [loading, setLoading] = useState(true);

  const level = path.length;

  const selectedIds = useMemo(() => {
    const [groupId, subOneId, subTwoId, subThreeId] = path;
    return { groupId, subOneId, subTwoId, subThreeId };
  }, [path]);

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
    } catch (err: unknown) {
      console.error('❌ Error fetching category data:', err);
    } finally {
      setLoading(false);
    }
  }, [level, selectedIds.groupId, selectedIds.subOneId, selectedIds.subTwoId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uploadImage = async (file: File, id: string) => {
    switch (level) {
      case 0: return await uploadGroupImage(id, file);
      case 1: return await uploadSubOneImage(id, file);
      case 2: return await uploadSubTwoImage(id, file);
      case 3: return await uploadSubThreeImage(id, file);
      default: return false;
    }
  };

  const deleteImage = async (imageUrl: string, id: string) => {
    switch (level) {
      case 0: return await deleteGroupImage(id, imageUrl);
      case 1: return await deleteSubOneImage(id, imageUrl);
      case 2: return await deleteSubTwoImage(id, imageUrl);
      case 3: return await deleteSubThreeImage(id, imageUrl);
      default: return false;
    }
  };

  const currentData = useMemo(() => {
    switch (level) {
      case 0: return groups;
      case 1: return subOnes;
      case 2: return subTwos;
      case 3: return subThrees;
      default: return [];
    }
  }, [level, groups, subOnes, subTwos, subThrees]);

  return {
    level,
    ids: selectedIds,
    groups,
    subOnes,
    subTwos,
    subThrees,
    data: currentData,
    loading,
    uploadImage,
    deleteImage,
    refetch: fetchData,
  };
}