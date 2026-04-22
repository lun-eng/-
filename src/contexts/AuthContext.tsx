import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; role: string } | null;
  login: (email: string) => Promise<{ success: boolean; role?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: string } | null>(() => {
    const saved = localStorage.getItem("unitx_user");
    return saved ? JSON.parse(saved) : null;
  });
  const isLoggedIn = !!user;

  const login = async (email: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("unitx_user", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, role: data.user.role };
      }
      return { success: false };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("unitx_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
