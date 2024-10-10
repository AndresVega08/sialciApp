import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userId: string | null;
  userEmail: string | null;
  userRole: string | null;
  setUser: (id?: string, email?: string, role?: string) => void; // Permitir la actualización de uno o más
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const setUser = (id?: string, email?: string, role?: string) => {
    if (id) setUserId(id);
    if (email) setUserEmail(email);
    if (role) setUserRole(role);
  };

  const clearUser = () => {
    setUserId(null);
    setUserEmail(null);
    setUserRole(null);
  };

  return (
    <UserContext.Provider value={{ userId, userEmail, userRole, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser utilizado dentro de UserProvider');
  }
  return context;
};
