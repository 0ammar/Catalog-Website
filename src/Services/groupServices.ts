// src/services/groupApi.ts
import { api } from '@/Services/axios';
import { Group, SubOne, SubTwo, SubThree } from '@/types/apiTypes';

export const getGroups = async (): Promise<Group[]> => {
  try {
    const response = await api.get<Group[]>('/api/groups');
    return response.data;
  } catch (err) {
    console.error('❌ Error fetching groups:', err);
    return [];
  }
};

export const getSubOnes = async (groupId: string): Promise<SubOne[]> => {
  try {
    const response = await api.get<SubOne[]>(`/api/subones/${groupId}`);
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      console.warn(`⚠️ No SubOnes found for groupId = ${groupId}`);
    } else {
      console.error('❌ Error fetching SubOnes:', err);
    }
    return [];
  }
};

export const getSubTwos = async (
  groupId: string,
  subOneId: string
): Promise<SubTwo[]> => {
  try {
    const response = await api.get<SubTwo[]>('/api/subtwos', {
      params: { groupId, subOneId },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error fetching SubTwos:', err);
    return [];
  }
};

export const getSubThrees = async (
  groupId: string,
  subOneId: string,
  subTwoId: string
): Promise<SubThree[]> => {
  try {
    const response = await api.get<SubThree[]>('/api/subthrees', {
      params: { groupId, subOneId, subTwoId },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error fetching SubThrees:', err);
    return [];
  }
};

export const getSubOneById = async (
  subOneId: string
): Promise<SubOne | null> => {
  try {
    const allGroups = await getGroups();
    for (const group of allGroups) {
      const subOnes = await getSubOnes(group.id);
      const found = subOnes.find((s) => s.id === subOneId);
      if (found) return found;
    }
    console.warn('⚠️ SubOne not found in any group');
    return null;
  } catch (err) {
    console.error('❌ Error in getSubOneById:', err);
    return null;
  }
};
