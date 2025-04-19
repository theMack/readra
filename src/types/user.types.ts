/**
 * Type definitions related to user data for the Readra application
 */

/**
 * User role types
 */
export enum UserRole {
    READER = 'reader',
    WRITER = 'writer',
    BOTH = 'both',
    ADMIN = 'admin',
  }
  
  /**
   * User subscription status
   */
  export enum SubscriptionStatus {
    FREE = 'free',
    BASIC = 'basic',
    PREMIUM = 'premium',
    PROFESSIONAL = 'professional',
  }
  
  /**
   * User interest categories
   */
  export interface UserInterests {
    fiction?: boolean;
    nonFiction?: boolean;
    scienceFiction?: boolean;
    fantasy?: boolean;
    mystery?: boolean;
    biography?: boolean;
    history?: boolean;
    selfHelp?: boolean;
    technology?: boolean;
    poetry?: boolean;
    [key: string]: boolean | undefined;
  }
  
  /**
   * Notification preferences
   */
  export interface NotificationPreferences {
    email: {
      newContent: boolean;
      comments: boolean;
      followers: boolean;
      marketing: boolean;
    };
    inApp: {
      newContent: boolean;
      comments: boolean;
      followers: boolean;
      system: boolean;
    };
  }
  
  /**
   * User profile type
   */
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    profileImageUrl?: string;
    bio?: string;
    userType: UserRole | string;
    interests?: UserInterests;
    subscriptionStatus?: SubscriptionStatus;
    subscriptionExpiresAt?: string;
    dateJoined: string;
    lastActive?: string;
    isVerified: boolean;
    notificationPreferences?: NotificationPreferences;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
      [key: string]: string | undefined;
    };
    stats?: {
      followers: number;
      following: number;
      publications: number;
      likes: number;
    };
  }
  
  /**
   * User update payload
   */
  export interface UserUpdatePayload {
    displayName?: string;
    bio?: string;
    interests?: UserInterests;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
      [key: string]: string | undefined;
    };
    notificationPreferences?: NotificationPreferences;
  }
  
  /**
   * Authentication response from server
   */
  export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
  }
  
  /**
   * Login credentials
   */
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  /**
   * Registration payload
   */
  export interface RegistrationPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  /**
   * User stats for reader/writer dashboard
   */
  export interface UserStats {
    contentViews: number;
    readTime: number;
    contentPublished: number;
    totalEarnings: number;
    followers: number;
    following: number;
  }
  
  /**
   * Basic public user profile (for other users to see)
   */
  export interface PublicUserProfile {
    id: string;
    displayName: string;
    profileImageUrl?: string;
    bio?: string;
    userType: UserRole | string;
    dateJoined: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
      [key: string]: string | undefined;
    };
    stats: {
      followers: number;
      publications: number;
    };
  }
  
  export default User;