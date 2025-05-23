import { LoginPayload } from '@/types/apiTypes';
import { api } from './axios';

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/api/auth/login', payload);
  return response.data.token as string;
};
