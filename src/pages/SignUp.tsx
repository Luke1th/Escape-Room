import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { InputField } from '@/components/auth/InputField';
import { SignUpData, AuthState } from '@/types/auth';
import { auth } from '../Firebase/firebaseConf';

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors on input change
    if (authState.error || fieldErrors[name]) {
      setAuthState(prev => ({ ...prev, error: null }));
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setAuthState({ isLoading: true, error: null });

try {
     const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
     const user = userCredential.user;

      // Update display name (full name)
      await updateProfile(user, { displayName: formData.fullName });

      console.log('User created:', user);

      // Navigate to dashboard
      navigate('/intro');
      setAuthState({ isLoading: false, error: null });
    } catch (error) {
      console.error('Sign-up error:', error);
      setAuthState({
        isLoading: false,
        error: { message: error.message || 'Failed to create account. Please try again.' }
      });
    }
  };
    
    // TODO: Replace with Firebase authentication
  //   try {
  //     // Placeholder for Firebase auth logic
  //     console.log('Sign up attempt:', formData);
      
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // TODO: Implement Firebase createUserWithEmailAndPassword
  //     // const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  //     // await updateProfile(userCredential.user, { displayName: formData.fullName });
  //     // Navigate to dashboard or main app
      
  //     setAuthState({ isLoading: false, error: null });
  //   } catch (error) {
  //     setAuthState({
  //       isLoading: false,
  //       error: { message: 'Failed to create account. Please try again.' }
  //     });
  //   }
  // };

  return (
    <AuthLayout
      title="Join the Crew"
      subtitle="Create your account to begin the mission"
    >


      <form onSubmit={handleSubmit} className="space-y-6">
        {authState.error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm animate-fade-in">
            {authState.error.message}
          </div>
        )}
        
        <div className="space-y-4">
          <InputField
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Your codename"
            value={formData.fullName}
            onChange={handleInputChange}
            error={fieldErrors.fullName}
            required
            autoComplete="name"
          />
          
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={fieldErrors.email}
            required
            autoComplete="email"
          />
          
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleInputChange}
            error={fieldErrors.password}
            required
            autoComplete="new-password"
          />
          
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={fieldErrors.confirmPassword}
            required
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          variant="dubai"
          size="lg"
          className="w-full"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? 'Preparing Your Mission...' : 'Create Account'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already part of the crew?{' '}
            <Link 
              to="/signin" 
              className="text-secondary hover:text-secondary-glow transition-colors font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
