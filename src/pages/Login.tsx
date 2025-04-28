
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { Leaf } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAfterLogin = location.state?.from || '/my-plants';

  useEffect(() => {
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate(redirectAfterLogin);
    }

    // Check if there's a success message from signup
    const signupSuccess = location.state?.signupSuccess;
    if (signupSuccess) {
      toast.success('Account created successfully! Please log in.');
    }
  }, [navigate, location, redirectAfterLogin]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demonstration purposes we'll simulate authentication
      // In a real app, this would connect to Supabase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast.success('Login successful!');
      
      // Store authentication state (temporary for demo)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ email }));
      
      // Navigate to intended destination
      navigate(redirectAfterLogin);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-ur-green" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back to UrbanRoots
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Log in to manage your plants and continue your green journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
