"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: null | { email: string; _id: string };
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      await fetchUser();
      toast.success("Successfully Logged In");
      return true;
    }
    return false;
  }

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setLoading(false);
    toast.success("Successfully Logged Out");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 