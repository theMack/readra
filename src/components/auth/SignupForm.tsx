import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming these components exist based on your project structure
import Button from '../../components/Button';
import { signup } from '../../services/api/auth';
import { 
  validateEmail, 
  validatePassword, 
  validateName 
} from '../../utils/validators';

interface SignupFormProps {
  onSuccess?: () => void;
  redirectToProfileSetup?: boolean;
  redirectPath?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  redirectToProfileSetup = true,
  redirectPath = '/profile-setup',
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    general?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always validate and set errors, even if validation fails
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { firstName, lastName, email, password } = formData;
      
      await signup({
        firstName,
        lastName,
        email,
        password
      });
      
      if (onSuccess) {
        onSuccess();
      } else if (redirectToProfileSetup) {
        navigate(redirectPath);
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.message === 'EMAIL_EXISTS') {
        setErrors({
          email: 'This email is already registered. Please use a different email or sign in.'
        });
      } else {
        setErrors({
          general: 'An error occurred during sign up. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'input-error' : ''}
              placeholder="First name"
              required
            />
            {errors.firstName && <div className="field-error">{errors.firstName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'input-error' : ''}
              placeholder="Last name"
              required
            />
            {errors.lastName && <div className="field-error">{errors.lastName}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="your@email.com"
            required
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            placeholder="••••••••"
            required
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
            placeholder="••••••••"
            required
          />
          {errors.confirmPassword && (
            <div className="field-error">{errors.confirmPassword}</div>
          )}
        </div>
        
        <div className="form-group checkbox-group">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms">
            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </label>
          {errors.agreeToTerms && (
            <div className="field-error">{errors.agreeToTerms}</div>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>
        
        <div className="login-option">
          <span>Already have an account?</span>
          <a href="/login">Sign in</a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;