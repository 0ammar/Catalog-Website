// src/hooks/useCategoryNavigator.ts
'use client';

import { useEffect, useState } from 'react';
import {
  getGroups,
  getSubOnes,
  getSubTwos,
  getSubThrees,
} from '@/Services/groupServices';
import { Group, SubOne, SubTwo, SubThree } from '@/types/apiTypes';

export function useCategoryNavigator(path: string[]) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [subOnes, setSubOnes] = useState<SubOne[]>([]);
  const [subTwos, setSubTwos] = useState<SubTwo[]>([]);
  const [subThrees, setSubThrees] = useState<SubThree[]>([]);
  const [loading, setLoading] = useState(true);

  const level = path.length;
  const currentLevelName =
    level === 1 ? 'المجموعة 1'
    : level === 2 ? 'المجموعة 2'
    : level === 3 ? 'المجموعة 3'
    : level === 4 ? 'المجموعة 4'
    : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (level === 0) {
          const data = await getGroups();
          setGroups(data);
        } else if (level === 1) {
          const data = await getSubOnes(path[0]);
          setSubOnes(data);
        } else if (level === 2) {
          const data = await getSubTwos(path[0], path[1]);
          setSubTwos(data);
        } else if (level === 3) {
          const data = await getSubThrees(path[0], path[1], path[2]);
          setSubThrees(data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path]);

  const currentData =
    level === 0 ? groups
    : level === 1 ? subOnes
    : level === 2 ? subTwos
    : level === 3 ? subThrees
    : [];

  return { currentLevelName, currentData, loading };
}