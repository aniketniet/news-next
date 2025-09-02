'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    
    try {
      const response = await fetch('https://shopninja.in/pioneer/public/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = {
          id: data.user?.id || data.data?.id || '1',
          name: data.user?.name || data.data?.name || 'User',
          email: data.user?.email || data.data?.email || email,
        };

        setUser(userData);
        
        // Store token and user data
        if (data.token || data.access_token) {
          localStorage.setItem('auth_token', data.token || data.access_token);
        }
        localStorage.setItem('user_data', JSON.stringify(userData));

        return { success: true, message: 'Login successful!' };
      } else {
        return { 
          success: false, 
          message: data.message || 'Login failed. Please check your credentials.' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = {
          id: data.user?.id || data.data?.id || '1',
          name: data.user?.name || data.data?.name || name,
          email: data.user?.email || data.data?.email || email,
        };

        setUser(userData);
        
        // Store token and user data
        if (data.token || data.access_token) {
          localStorage.setItem('auth_token', data.token || data.access_token);
        }
        localStorage.setItem('user_data', JSON.stringify(userData));

        return { success: true, message: 'Registration successful!' };
      } else {
        return { 
          success: false, 
          message: data.message || 'Registration failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
