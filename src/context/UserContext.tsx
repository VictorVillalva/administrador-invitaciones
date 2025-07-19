'use client'
import { createContext, useContext, useState, ReactNode } from "react";

export type UserData = {
  token: string;
  uuid: string;
  username: string;
  honereeName: string;
  eventType: string;
  eventDate: string;
  eventDeadLine: string;
  // ...otros campos según tu API
};

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  const logout = () => {
    setUser(null);
    // Aquí puedes poner lógica extra, por ejemplo: Cookies.remove('token')
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de <UserProvider>");
  }
  return context;
}
