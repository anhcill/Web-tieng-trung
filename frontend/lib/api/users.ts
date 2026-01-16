import axios from '../utils/axios';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  display_name: string;
  avatar: string;
  role: string;
  bio?: string;
  target_score?: number;
  created_at: string;
}

export interface UpdateProfileData {
  full_name?: string;
  display_name?: string;
  bio?: string;
  target_score?: number;
}

export interface UserStats {
  total_exams: number;
  avg_score: number;
  highest_score: number;
  total_posts: number;
  total_comments: number;
}

/**
 * Get user by ID
 */
export const getUserById = async (id: number): Promise<{ success: boolean; data: { user: User } }> => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (id: number, data: UpdateProfileData): Promise<{ success: boolean; message: string; data: { user: User } }> => {
  const response = await axios.put(`/users/${id}`, data);
  return response.data;
};

/**
 * Update user avatar
 */
export const updateAvatar = async (id: number, avatar: string): Promise<{ success: boolean; message: string; data: { user: User } }> => {
  const response = await axios.post(`/users/${id}/avatar`, { avatar });
  return response.data;
};

/**
 * Get user stats
 */
export const getUserStats = async (id: number): Promise<{ success: boolean; data: UserStats }> => {
  const response = await axios.get(`/users/${id}/stats`);
  return response.data;
};
