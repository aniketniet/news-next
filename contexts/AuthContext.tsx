"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { fetchProfile, updateProfile, UpdateProfileData } from "@/lib/api/profile";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ApiResult {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ApiResult>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<ApiResult>;
  forgotPassword: (email: string) => Promise<ApiResult>;
  resetPassword: (
    email: string,
    otp: string,
    password: string
  ) => Promise<ApiResult>;
  updateProfile: (profileData: UpdateProfileData) => Promise<ApiResult>;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function resolveBaseUrl(): string {
  let raw =
    (process as any)?.env?.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "";
  if (raw?.includes("process.env."))
    raw = raw.replace(/process\.env\./g, "").trim();
  if (!raw) raw = "http://127.0.0.1:8000/api";
  return raw.replace(/\/+$/, "");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const api: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: resolveBaseUrl(),
      headers: { Accept: "application/json" },
      withCredentials: false,
      timeout: 20000,
    });
    instance.interceptors.request.use((config) => {
      const token =
        typeof window !== "undefined" ? Cookies.get("auth_token") : null;
      if (token) {
        config.headers = config.headers || {};
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
    instance.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err?.response?.status === 401) {
          Cookies.remove("auth_token");
          localStorage.removeItem("user_data");
          setUser(null);
        }
        return Promise.reject(err);
      }
    );
    return instance;
  }, []);

  // Load stored user
  useEffect(() => {
    const token = Cookies.get("auth_token");
    const userData = localStorage.getItem("user_data");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        Cookies.remove("auth_token");
        localStorage.removeItem("user_data");
      }
    }
  }, []);

  const persistSession = (
    raw: any,
    fallbackEmail: string,
    fallbackName: string
  ) => {
    const container =
      raw?.data && (raw.data.token || raw.data.user || raw.data.access_token)
        ? raw.data
        : raw;
    const token: string | undefined = container.token || container.access_token;
    const tokenType: string | undefined =
      container.token_type || raw.token_type || "Bearer";
    const expiresIn: number | undefined =
      container.expires_in || raw.expires_in; // seconds
    const userObj = container.user || raw.user || {};
    const userData: User = {
      id: String(userObj.id || "1"),
      name: userObj.name || fallbackName,
      email: userObj.email || fallbackEmail,
    };
    setUser(userData);
    if (token) {
      const opts: any = {
        sameSite: "lax",
        secure:
          typeof window !== "undefined" &&
          window.location.protocol === "https:",
      };
      if (expiresIn && !isNaN(expiresIn)) {
        opts.expires = new Date(Date.now() + expiresIn * 1000);
      }
      Cookies.set("auth_token", token, opts);
      Cookies.set("auth_token_type", tokenType || "Bearer", opts);
    }
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  const login = async (email: string, password: string): Promise<ApiResult> => {
    setLoading(true);
    try {
      const { data, status } = await api.post(
        "/login",
        new URLSearchParams({ email, password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (
        status < 300 &&
        (data.success ||
          data.token ||
          data.access_token ||
          data.data?.token ||
          data.data?.user)
      ) {
        persistSession(data, email, "User");
        return { success: true, message: data.message || "Login successful!" };
      }
      return {
        success: false,
        message: data.message || "Login failed. Please check your credentials.",
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResult> => {
    setLoading(true);
    try {
      const { data, status } = await api.post(
        "/register",
        new URLSearchParams({ name, email, password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (
        status < 300 &&
        (data.success || data.user || data.data?.user || data.data?.token)
      ) {
        persistSession(data, email, name);
        return {
          success: true,
          message: data.message || "Registration successful!",
        };
      }
      return {
        success: false,
        message: data.message || "Registration failed. Please try again.",
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<ApiResult> => {
    setLoading(true);
    try {
      const { data, status } = await api.post(
        "/forgot-password",
        new URLSearchParams({ email }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (status < 300) {
        return {
          success: !!(data.success ?? true),
          message: data.message || "OTP sent to email if it exists.",
        };
      }
      return {
        success: false,
        message: data.message || "Failed to send reset email.",
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    otp: string,
    password: string
  ): Promise<ApiResult> => {
    setLoading(true);
    try {
      const { data, status } = await api.post(
        "/reset-password",
        new URLSearchParams({ email, otp, password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (status < 300 && (data.success || data.message)) {
        return {
          success: true,
          message: data.message || "Password reset successful.",
        };
      }
      return {
        success: false,
        message: data.message || "Failed to reset password.",
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  const refreshProfile = async (): Promise<void> => {
    const token = Cookies.get("auth_token");
    if (!token || !user) return;
    
    try {
      const profileData = await fetchProfile(token);
      const updatedUser: User = {
        id: String(profileData.id),
        name: profileData.name,
        email: profileData.email,
      };
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  const updateUserProfile = async (profileData: UpdateProfileData): Promise<ApiResult> => {
    const token = Cookies.get("auth_token");
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    setLoading(true);
    try {
      const result = await updateProfile(token, profileData);
      if (result.success) {
        // Refresh profile data after successful update
        await refreshProfile();
      }
      return result;
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Failed to update profile",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        forgotPassword,
        resetPassword,
        updateProfile: updateUserProfile,
        refreshProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
