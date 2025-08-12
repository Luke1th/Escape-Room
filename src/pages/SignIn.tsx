import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { InputField } from '@/components/auth/InputField';
import { SignInData, AuthState } from '@/types/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConf';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: '',
  });
  
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors on input change
    if (authState.error) {
      setAuthState(prev => ({ ...prev, error: null }));
    }
  };

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setAuthState({ isLoading: true, error: null });

  try {
   const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    console.log('User signed in:', userCredential.user);

    // Navigate to dashboard after login success
    navigate('/act1');
    setAuthState({ isLoading: false, error: null });
  } catch (error) {
    console.error('Sign-in error:', error);
    setAuthState({
      isLoading: false,
      error: { message: error.message || 'Invalid email or password. Please try again.' }
    });
  }
};
  

  return (
    <AuthLayout
      title="Access the Vault"
      subtitle="Sign in to continue your mission"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {authState.error && (
          <div className="from-backgrounds/90 border border-destructive/20 text-destructive p-3 rounded-lg text-sm animate-fade-in text-white">
            {authState.error.message}
          </div>
        )}
        
        <div className="space-y-4">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="professor@lacasadepapel.es"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
          />
          
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your secure password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link 
            to="/forgot-password" 
            className="text-sm text-muted-foregrounds hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="heist"
          size="lg"
          className="w-full"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? 'Accessing Vault...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foregrounds">
            New to the crew?{' '}
            <Link 
              to="/signup" 
              className="text-primary hover:text-primary-glow transition-colors font-medium"
            >
              Join the heist
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
