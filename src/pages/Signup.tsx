
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { Leaf } from 'lucide-react';

const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/my-plants');
    }
  }, [navigate]);

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demonstration purposes we'll simulate registration
      // In a real app, this would connect to Supabase Auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to login page with success message
      navigate('/login', { 
        state: { 
          signupSuccess: true,
          email
        } 
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
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
          Join UrbanRoots Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create an account to start your gardening journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
