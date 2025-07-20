import { UserData } from "@/context/UserContext";
import { useState, useEffect } from "react";

export function useUserData(): UserData | null {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Esto solo se ejecuta en el cliente
    const saved = localStorage.getItem("userData");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return user;
}

