import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { updateUserProfile, getUserProfile } from '../../services/api/auth';
import { User } from '../../types/user.types';

interface ProfileSetupProps {
  onComplete?: () => void;
  redirectPath?: string;
  userId?: string; // Optional: if we already have the user ID
}

type UserInterests = {
  fiction: boolean;
  nonFiction: boolean;
  scienceFiction: boolean;
  fantasy: boolean;
  mystery: boolean;
  biography: boolean;
  history: boolean;
  selfHelp: boolean;
  technology: boolean;
  poetry: boolean;
};

const ProfileSetup: React.FC<ProfileSetupProps> = ({
  onComplete,
  redirectPath = '/dashboard',
  userId,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  // Profile data
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    profileImage: null as File | null,
    profileImageUrl: '',
    userType: '', // 'reader', 'writer', or 'both'
    interests: {
      fiction: false,
      nonFiction: false,
      scienceFiction: false,
      fantasy: false,
      mystery: false,
      biography: false,
      history: false,
      selfHelp: false,
      technology: false,
      poetry: false,
    } as UserInterests,
  });

  // Fetch existing profile data if available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        const userData = await getUserProfile(userId);
        
        if (userData) {
          setProfileData(prevData => ({
            ...prevData,
            displayName: userData.displayName || '',
            bio: userData.bio || '',
            profileImageUrl: userData.profileImageUrl || '',
            userType: userData.userType || '',
            interests: userData.interests ? {
              ...prevData.interests,
              ...userData.interests
            } : prevData.interests,
          }));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      interests: {
        ...prevData.interests,
        [name]: checked,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData(prevData => ({
        ...prevData,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !profileData.displayName) {
      setError('Display name is required');
      return;
    }
    
    if (currentStep === 2 && !profileData.userType) {
      setError('Please select how you plan to use Readra');
      return;
    }
    
    setError(null);
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare data for submission
      const formData = new FormData();
      formData.append('displayName', profileData.displayName);
      formData.append('bio', profileData.bio);
      formData.append('userType', profileData.userType);
      formData.append('interests', JSON.stringify(profileData.interests));
      
      if (profileData.profileImage) {
        formData.append('profileImage', profileData.profileImage);
      }
      
      // Submit profile data
      await updateUserProfile(formData);
      
      if (onComplete) {
        onComplete();
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Basic Profile Info
  const renderBasicInfo = () => (
    <div className="profile-setup-step">
      <h3>Let's set up your profile</h3>
      <p>Tell us a bit about yourself</p>
      
      <div className="form-group">
        <label htmlFor="displayName">Display Name*</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={profileData.displayName}
          onChange={handleChange}
          placeholder="Your display name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="profileImage">Profile Picture</label>
        <div className="profile-image-container">
          {profileData.profileImageUrl && (
            <img 
              src={profileData.profileImageUrl} 
              alt="Profile preview" 
              className="profile-image-preview" 
            />
          )}
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          placeholder="Tell others about yourself (optional)"
          rows={4}
        />
      </div>
    </div>
  );

  // Step 2: User Type Selection
  const renderUserTypeSelection = () => (
    <div className="profile-setup-step">
      <h3>How do you plan to use Readra?</h3>
      
      <div className="user-type-options">
        <div className={`user-type-option ${profileData.userType === 'reader' ? 'selected' : ''}`}>
          <input
            type="radio"
            id="reader"
            name="userType"
            value="reader"
            checked={profileData.userType === 'reader'}
            onChange={handleChange}
          />
          <label htmlFor="reader">
            <h4>I'm here to read</h4>
            <p>Discover and enjoy content from talented writers</p>
          </label>
        </div>
        
        <div className={`user-type-option ${profileData.userType === 'writer' ? 'selected' : ''}`}>
          <input
            type="radio"
            id="writer"
            name="userType"
            value="writer"
            checked={profileData.userType === 'writer'}
            onChange={handleChange}
          />
          <label htmlFor="writer">
            <h4>I'm here to write</h4>
            <p>Share your work and connect with readers</p>
          </label>
        </div>
        
        <div className={`user-type-option ${profileData.userType === 'both' ? 'selected' : ''}`}>
          <input
            type="radio"
            id="both"
            name="userType"
            value="both"
            checked={profileData.userType === 'both'}
            onChange={handleChange}
          />
          <label htmlFor="both">
            <h4>Both</h4>
            <p>I want to read great content and publish my own</p>
          </label>
        </div>
      </div>
    </div>
  );

  // Step 3: Interests Selection
  const renderInterestsSelection = () => (
    <div className="profile-setup-step">
      <h3>What are you interested in?</h3>
      <p>Select topics that interest you (optional)</p>
      
      <div className="interest-options">
        {Object.entries(profileData.interests).map(([key, checked]) => (
          <div className="interest-option" key={key}>
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={checked}
              onChange={handleInterestChange}
            />
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-progress">
        <div className="progress-steps">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="profile-setup-form">
        {currentStep === 1 && renderBasicInfo()}
        {currentStep === 2 && renderUserTypeSelection()}
        {currentStep === 3 && renderInterestsSelection()}
        
        <div className="profile-setup-actions">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              disabled={isLoading}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            >
              Complete Setup
            </Button>
          )}
        </div>
        
        <div className="skip-option">
          <button 
            type="button" 
            className="skip-link"
            onClick={() => navigate(redirectPath)}
            disabled={isLoading}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;