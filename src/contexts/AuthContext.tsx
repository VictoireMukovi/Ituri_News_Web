import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { mockApi } from '../lib/mock-api';

interface AuthContextValue extends AuthState {
  signIn: (mockGoogleToken?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const user = await mockApi.getMe(token);
          if (user) {
            setState({
              user,
              token,
              isLoading: false,
              isAuthenticated: true,
            });
            return;
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    };

    checkAuth();
  }, []);

  const signIn = async (mockGoogleToken: string = 'google000') => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // In a real app, this would handle the Google OAuth flow
      // For demo purposes, we'll simulate different users based on the token
      const { user, token } = await mockApi.signInWithGoogle(mockGoogleToken);
      
      localStorage.setItem('auth_token', token);
      
      setState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Sign in failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('auth_token');
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}