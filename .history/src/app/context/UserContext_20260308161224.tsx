import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  constituency: string;
  party: string;
  address: string;
  bio: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  memberSince: string;
  location: string;
  photoUrl: string;
}

interface UserContextType {
  userData: UserData | null;
  isAuthenticated: boolean;
  login: (data: UserData) => void;
  logout: () => void;
  updateUserData: (data: Partial<UserData>) => void;
}

// initialUserData is no longer used for state initialization, but left here
// as a convenient template for mock responses or resets.
const initialUserData: UserData = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@campaign.in',
  phone: '+91 98765 43210',
  role: 'Campaign Manager',
  constituency: 'North Delhi',
  party: 'ABC Party',
  address: '123 Parliament Street, New Delhi',
  bio: 'Experienced campaign manager with 15+ years in political operations and grassroots mobilization. Specialized in data-driven campaign strategies and voter outreach programs.',
  twitter: 'https://twitter.com/admin',
  linkedin: 'https://linkedin.com/in/admin',
  facebook: 'https://facebook.com/admin',
  memberSince: 'January 2024',
  location: 'North Delhi, India',
  photoUrl: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // always have a default user so that settings/profile pages render
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  // optional: keep the old localStorage logic for token restoration
  useEffect(() => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token && !userData) {
        // in a real app this would be a fetch to /me or similar
        setUserData(initialUserData);
      }
    } catch {}
  }, [userData]);

  const login = (data: UserData) => setUserData(data);
  const logout = () => setUserData(null);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isAuthenticated: !!userData,
        login,
        logout,
        updateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
