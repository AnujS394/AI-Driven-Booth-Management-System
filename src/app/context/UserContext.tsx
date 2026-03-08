import { createContext, useContext, useState, ReactNode } from 'react';

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
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

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
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData(initialUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, resetUserData }}>
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
