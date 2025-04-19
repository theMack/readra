import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming these components exist based on your project structure
import Button from '../../components/Button';
import { login } from '../../services/api/auth';
import { validateEmail, validatePassword } from '../../utils/validators';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  redirectPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  redirectPath = '/dashboard',
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
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
      await login(email, password, rememberMe);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectPath);
      }
    } catch (error) {
      setErrors({
        general: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
            placeholder="••••••••"
            required
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        
        <div className="form-options">
          <div className="remember-me">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          
          {onForgotPassword && (
            <button
              type="button"
              className="forgot-password-link"
              onClick={onForgotPassword}
            >
              Forgot password?
            </button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>
        
        <div className="signup-option">
          <span>Don't have an account?</span>
          <a href="/signup">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;