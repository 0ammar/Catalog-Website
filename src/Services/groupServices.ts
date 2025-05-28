import { api } from '@/Services/axios';
import { Group, SubOne, SubTwo, SubThree } from '@/types/apiTypes';

// =================== FETCH ===================

export const getGroups = async (): Promise<Group[]> => {
  try {
    const { data } = await api.get<Group[]>('/api/groups');
    return data;
  } catch (err) {
    console.error('❌ Failed to fetch groups:', err);
    return [];
  }
};

export const getSubOnes = async (groupId: string): Promise<SubOne[]> => {
  try {
    const { data } = await api.get<SubOne[]>(`/api/subones/${groupId}`);
    return data;
  } catch (err) {
    console.error(`❌ Failed to fetch SubOnes for groupId: ${groupId}`, err);
    return [];
  }
};

export const getSubTwos = async (groupId: string, subOneId: string): Promise<SubTwo[]> => {
  try {
    const { data } = await api.get<SubTwo[]>('/api/subtwos', {
      params: { groupId, subOneId },
    });
    return data;
  } catch (err) {
    console.error(`❌ Failed to fetch SubTwos for groupId: ${groupId}, subOneId: ${subOneId}`, err);
    return [];
  }
};

export const getSubThrees = async (groupId: string, subOneId: string, subTwoId: string): Promise<SubThree[]> => {
  try {
    const { data } = await api.get<SubThree[]>('/api/subthrees', {
      params: { groupId, subOneId, subTwoId },
    });
    return data;
  } catch (err) {
    console.error(`❌ Failed to fetch SubThrees`, err);
    return [];
  }
};

// =================== IMAGE UPLOAD ===================

const uploadImage = async (level: string, id: string, file: File): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file', file, file.name);

    await api.post(`/api/admin/${level}/${id}`, formData); 
    return true;
  } catch (err) {
    console.error(`❌ Failed to upload image for ${level} (${id})`, err);
    return false;
  }
};

export const uploadGroupImage = (id: string, file: File) => uploadImage('group', id, file);
export const uploadSubOneImage = (id: string, file: File) => uploadImage('subone', id, file);
export const uploadSubTwoImage = (id: string, file: File) => uploadImage('subtwo', id, file);
export const uploadSubThreeImage = (id: string, file: File) => uploadImage('subthree', id, file);

// =================== IMAGE DELETE ===================

const deleteImage = async (level: string, id: string, imageFileName: string): Promise<boolean> => {
  try {
    await api.delete(`/api/admin/${level}/${id}`, {
      params: { imageUrl: imageFileName },
    });
    return true;
  } catch (err) {
    console.error(`❌ Failed to delete image for ${level} (${id})`, err);
    return false;
  }
};

export const deleteGroupImage = (id: string, fileName: string) => deleteImage('group', id, fileName);
export const deleteSubOneImage = (id: string, fileName: string) => deleteImage('subone', id, fileName);
export const deleteSubTwoImage = (id: string, fileName: string) => deleteImage('subtwo', id, fileName);
export const deleteSubThreeImage = (id: string, fileName: string) => deleteImage('subthree', id, fileName);
