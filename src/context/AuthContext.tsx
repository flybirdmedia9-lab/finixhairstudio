import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("finix_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, pass: string) => {
    // Admin Credentials
    if (email === "admin@finixhairstudio.com" && pass === "123456") {
      const adminUser: User = { email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("finix_auth_user", JSON.stringify(adminUser));
      return true;
    }
    
    // Regular User Credentials
    if (email === "user@finixhairstudio.com" && pass === "123456") {
      const regularUser: User = { email, role: "user" };
      setUser(regularUser);
      localStorage.setItem("finix_auth_user", JSON.stringify(regularUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finix_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === "admin", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
