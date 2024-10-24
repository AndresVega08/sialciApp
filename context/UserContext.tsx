import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userId: string | null;
  userEmail: string | null;
  userRole: string | null;
  userName: string | null;
  userToken: string | null; 
  setUser: (id?: string, email?: string, role?: string, name?: string, token?: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null); 

  const setUser = (id?: string | null, email?: string | null, role?: string | null, name?: string | null, token?: string | null) => {
  if (id) setUserId(id); 
  if (email) setUserEmail(email); 
  if (role) setUserRole(role); 
  if (name) setUserName(name); 
  if (token) setUserToken(token); 

  // Mostrar por consola los valores almacenados
  console.log('Token guardado:', token);
  console.log('Nombre guardado:', name);
  console.log('Rol guardado:', role);
  console.log('Correo guardado:', email);
  console.log('Id guardado:', id);
};



  const clearUser = () => {
    setUserId(null);
    setUserEmail(null);
    setUserRole(null);
    setUserName(null);
    setUserToken(null); 
    console.log('Usuario limpiado');
  };

  return (
    <UserContext.Provider value={{ userId, userEmail, userRole, userName, userToken, setUser, clearUser }}>
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
