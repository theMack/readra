/**
 * Utility functions for form validation
 */

/**
 * Validate an email address
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    
    // RFC 5322 compliant regex for email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate a password
   * @param password Password to validate
   * @param options Optional validation options
   * @returns Boolean indicating if password is valid
   */
  export const validatePassword = (
    password: string, 
    options = {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: false
    }
  ): boolean => {
    if (!password) return false;
    
    // Check minimum length
    if (password.length < options.minLength) {
      return false;
    }
    
    // Check for uppercase letters
    if (options.requireUppercase && !/[A-Z]/.test(password)) {
      return false;
    }
    
    // Check for lowercase letters
    if (options.requireLowercase && !/[a-z]/.test(password)) {
      return false;
    }
    
    // Check for numbers
    if (options.requireNumber && !/[0-9]/.test(password)) {
      return false;
    }
    
    // Check for special characters
    if (options.requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return false;
    }
    
    return true;
  };
  
  /**
   * Validate that a value is not empty
   * @param value Value to check
   * @returns Boolean indicating if value is not empty
   */
  export const validateRequired = (value: string): boolean => {
    return value !== undefined && value !== null && value.trim() !== '';
  };
  
  /**
   * Validate a name (first name, last name)
   * @param name Name to validate
   * @returns Boolean indicating if name is valid
   */
  export const validateName = (name: string): boolean => {
    if (!name) return false;
    
    // Simple validation: non-empty and at least 2 characters
    return name.trim().length >= 2;
  };
  
  /**
   * Validate a URL
   * @param url URL to validate
   * @returns Boolean indicating if URL is valid
   */
  export const validateUrl = (url: string): boolean => {
    if (!url) return false;
    
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };
  
  /**
   * Validate a phone number
   * @param phone Phone number to validate
   * @returns Boolean indicating if phone is valid
   */
  export const validatePhone = (phone: string): boolean => {
    if (!phone) return false;
    
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it has a reasonable length (most phone numbers are 10-15 digits)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };
  
  /**
   * Validate a username
   * @param username Username to validate
   * @returns Boolean indicating if username is valid
   */
  export const validateUsername = (username: string): boolean => {
    if (!username) return false;
    
    // Allow letters, numbers, underscores, and hyphens, 3-30 characters
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    return usernameRegex.test(username);
  };
  
  /**
   * Validate a date is in the past
   * @param dateString Date string to validate
   * @returns Boolean indicating if date is in the past
   */
  export const validatePastDate = (dateString: string): boolean => {
    if (!dateString) return false;
    
    const inputDate = new Date(dateString);
    const today = new Date();
    
    // Check if date is valid and in the past
    return !isNaN(inputDate.getTime()) && inputDate < today;
  };
  
  /**
   * Validate a date is in the future
   * @param dateString Date string to validate
   * @returns Boolean indicating if date is in the future
   */
  export const validateFutureDate = (dateString: string): boolean => {
    if (!dateString) return false;
    
    const inputDate = new Date(dateString);
    const today = new Date();
    
    // Check if date is valid and in the future
    return !isNaN(inputDate.getTime()) && inputDate > today;
  };
  
  /**
   * Validate file type
   * @param file File to validate
   * @param allowedTypes Array of allowed MIME types
   * @returns Boolean indicating if file type is allowed
   */
  export const validateFileType = (
    file: File,
    allowedTypes: string[]
  ): boolean => {
    if (!file) return false;
    
    return allowedTypes.includes(file.type);
  };
  
  /**
   * Validate file size
   * @param file File to validate
   * @param maxSizeInBytes Maximum file size in bytes
   * @returns Boolean indicating if file size is within limits
   */
  export const validateFileSize = (
    file: File,
    maxSizeInBytes: number
  ): boolean => {
    if (!file) return false;
    
    return file.size <= maxSizeInBytes;
  };