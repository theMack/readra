/**
 * API endpoints for the Readra application
 * This file centralizes all API endpoint definitions
 */

export const endpoints = {
    // Authentication endpoints
    auth: {
      login: '/auth/login',
      signup: '/auth/signup',
      logout: '/auth/logout',
      refreshToken: '/auth/refresh-token',
      updateProfile: '/auth/profile',
      getUserProfile: '/auth/profile',
      requestPasswordReset: '/auth/request-reset',
      resetPassword: '/auth/reset-password',
      changePassword: '/auth/change-password',
    },
    
    // Content endpoints
    content: {
      getAll: '/content',
      getFeatured: '/content/featured',
      getById: '/content', // append /:id
      getByCategory: '/content/category', // append /:category
      getByAuthor: '/content/author', // append /:authorId
      create: '/content',
      update: '/content', // append /:id
      delete: '/content', // append /:id
      like: '/content/like', // append /:id
      bookmark: '/content/bookmark', // append /:id
      comment: '/content/comment', // append /:id
      getComments: '/content/comments', // append /:id
    },
    
    // Creator endpoints
    creator: {
      getProfile: '/creator/profile', // append /:id
      getStats: '/creator/stats',
      getEarnings: '/creator/earnings',
      getContent: '/creator/content',
      getDashboard: '/creator/dashboard',
    },
    
    // Reader endpoints
    reader: {
      getRecommendations: '/reader/recommendations',
      getHistory: '/reader/history',
      getBookmarks: '/reader/bookmarks',
      getLikes: '/reader/likes',
      getFollowing: '/reader/following',
      getSubscriptions: '/reader/subscriptions',
      follow: '/reader/follow', // append /:creatorId
      unfollow: '/reader/unfollow', // append /:creatorId
    },
    
    // Subscription endpoints
    subscription: {
      getPlans: '/subscription/plans',
      getCurrentPlan: '/subscription/current',
      subscribe: '/subscription/subscribe',
      cancelSubscription: '/subscription/cancel',
      updatePaymentMethod: '/subscription/payment-method',
      getPaymentHistory: '/subscription/payment-history',
      verifySubscription: '/subscription/verify',
    },
    
    // Search endpoints
    search: {
      content: '/search/content',
      creators: '/search/creators',
    },
    
    // Notification endpoints
    notifications: {
      getAll: '/notifications',
      markAsRead: '/notifications/read', // append /:id
      markAllAsRead: '/notifications/read-all',
      getSettings: '/notifications/settings',
      updateSettings: '/notifications/settings',
    },
  };
  
  export default endpoints;