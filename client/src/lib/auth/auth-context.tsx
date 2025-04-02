import type { AuthContextType, AuthUser } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginRequest, logoutRequest } from "../api/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await checkAuthStatus()
      if (response.success) {
        setUser(response.data)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await loginRequest({ email, password })
    if (response.success && response.data) {
      setUser(response.data)
      return true
    }
    return false
  }

  const logout = async () => {
    const response = await logoutRequest()
    if (response.success) {
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};