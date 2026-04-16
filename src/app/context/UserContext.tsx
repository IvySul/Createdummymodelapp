import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  birthday: { month: string; day: string; year: string };
  gender: string;
  ethnicity: string;
  occupation: string;
  religion: string;
  politics: string;
  bio: string;
  budget: number;
  substances: string;
  pets: string;
  cleanliness: string;
  guests: string;
  schedule: string;
  noise: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const defaultUserData: UserData = {
  name: '',
  birthday: { month: '', day: '', year: '' },
  gender: '',
  ethnicity: '',
  occupation: '',
  religion: '',
  politics: '',
  bio: '',
  budget: 500,
  substances: '',
  pets: '',
  cleanliness: '',
  guests: '',
  schedule: '',
  noise: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
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
