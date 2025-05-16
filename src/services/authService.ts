import apiClient from './apiClient';

// For demo purposes, we'll mock the auth service
// In a real app, these would make actual API calls

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

// Mock user data for demo
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

const MOCK_ADMIN: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          localStorage.setItem('token', 'mock-admin-token');
          localStorage.setItem('user', JSON.stringify(MOCK_ADMIN));
          resolve(MOCK_ADMIN);
        } else if (email === 'john@example.com' && password === 'password') {
          localStorage.setItem('token', 'mock-user-token');
          localStorage.setItem('user', JSON.stringify(MOCK_USER));
          resolve(MOCK_USER);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Simulate network delay
    });
  },

  async register(userData: any): Promise<User> {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...MOCK_USER,
          name: userData.name,
          email: userData.email,
        };
        localStorage.setItem('token', 'mock-user-token');
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800); // Simulate network delay
    });
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    // In a real app, this would validate the token with the server
    return new Promise((resolve) => {
      setTimeout(() => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          resolve(JSON.parse(userJson));
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // In a real app, you'd have more methods here
};