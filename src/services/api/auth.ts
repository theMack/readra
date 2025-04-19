import { apiClient } from '../../utils/api/apiClient';
import { endpoints } from '../../utils/api/endpoints';
import { User } from '../../types/user.types';

/**
 * Login with email and password
 * @param email User email
 * @param password User password
 * @param rememberMe Whether to keep user logged in
 * @returns Promise with user data
 */
export const login = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<User> => {
  try {
    const response = await apiClient.post(endpoints.auth.login, {
      email,
      password,
      rememberMe,
    });
    
    // Store auth token
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('authToken', token);
      
      // Store user info
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Signup with user data
 * @param userData User registration data
 * @returns Promise with user data
 */
export const signup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await apiClient.post(endpoints.auth.signup, userData);
    
    // Store auth token and user info
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return user;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

/**
 * Log out the current user
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint if needed
    await apiClient.post(endpoints.auth.logout);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always remove local storage items
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating authentication status
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get current user data
 * @returns User object or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Update user profile
 * @param userData FormData containing profile data
 * @returns Promise with updated user data
 */
export const updateUserProfile = async (userData: FormData): Promise<User> => {
  try {
    const response = await apiClient.put(
      endpoints.auth.updateProfile,
      userData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    // Update stored user data
    const updatedUser = response.data.user;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

/**
 * Get user profile by ID
 * @param userId User ID
 * @returns Promise with user profile data
 */
export const getUserProfile = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.get(`${endpoints.auth.getUserProfile}/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    throw error;
  }
};

/**
 * Request password reset
 * @param email User email
 * @returns Promise indicating success
 */
export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await apiClient.post(endpoints.auth.requestPasswordReset, { email });
  } catch (error) {
    console.error('Password reset request failed:', error);
    throw error;
  }
};

/**
 * Reset password with token
 * @param token Reset token
 * @param newPassword New password
 * @returns Promise indicating success
 */
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await apiClient.post(endpoints.auth.resetPassword, {
      token,
      newPassword,
    });
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};

/**
 * Change password for authenticated user
 * @param currentPassword Current password
 * @param newPassword New password
 * @returns Promise indicating success
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await apiClient.post(endpoints.auth.changePassword, {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    console.error('Password change failed:', error);
    throw error;
  }
};