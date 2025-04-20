import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// User types
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  profileImageUrl?: string;
  userType?: 'reader' | 'writer' | 'both';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: FormData) => Promise<void>;
}

// Default context value
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
};

// Create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Storage keys
const AUTH_TOKEN_KEY = 'readra-auth-token';
const USER_DATA_KEY = 'readra-user-data';

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userData = localStorage.getItem(USER_DATA_KEY);
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(USER_DATA_KEY);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // In a real app, this would make an API call
    // For demonstration, we'll simulate a successful login
    const mockUser: User = {
      id: '123',
      firstName: 'Demo',
      lastName: 'User',
      displayName: 'Demo User',
      email: email,
      userType: 'reader',
    };
    
    // Save to storage
    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));
    
    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  // Signup function
  const signup = async (userData: any) => {
    // In a real app, this would make an API call
    // For demonstration, we'll simulate a successful signup
    const mockUser: User = {
      id: '123',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      displayName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      userType: 'reader',
    };
    
    // Save to storage
    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));
    
    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile function
  const updateProfile = async (userData: FormData) => {
    // In a real app, this would make an API call
    // For demonstration, we'll update the current user
    if (!user) return;
    
    const updatedUser = { ...user };
    
    // Update user with form data
    for (const [key, value] of userData.entries()) {
      if (key === 'displayName') updatedUser.displayName = value as string;
      // Handle other fields as needed
    }
    
    // Save updated user
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    updateProfile,
  };

  if (isLoading) {
    // You could return a loading indicator here
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;