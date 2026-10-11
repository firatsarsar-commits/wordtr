'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '@/lib/db/types';
import { 
  getCurrentUser, 
  setCurrentUser, 
  getAllProfiles, 
  saveProfile,
  authenticateUser,
  updateUserRole 
} from '@/lib/db/store';

interface AuthContextType {
  currentUser: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isMainAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { 
    fullName: string; 
    email: string; 
    studentNumber?: string; 
    password: string 
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  assignUserRole: (targetUserId: string, newRole: UserRole) => { success: boolean; error?: string };
  allProfiles: UserProfile[];
  refreshProfiles: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>(() => getAllProfiles());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCurrentUserState(getCurrentUser());
    setAllProfiles(getAllProfiles());
    setIsHydrated(true);
  }, []);

  const refreshProfiles = () => {
    setAllProfiles(getAllProfiles());
    setCurrentUserState(getCurrentUser());
  };

  const login = async (
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'E-posta ve şifre zorunludur.' };
    }

    const authenticated = authenticateUser(email, password);
    if (authenticated) {
      setCurrentUser(authenticated);
      setCurrentUserState(authenticated);
      refreshProfiles();
      return { success: true };
    }

    return { 
      success: false, 
      error: 'E-posta adresi veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.' 
    };
  };

  const register = async (data: { 
    fullName: string; 
    email: string; 
    studentNumber?: string; 
    password: string; 
  }): Promise<{ success: boolean; error?: string }> => {
    if (!data.fullName || !data.email || !data.password) {
      return { success: false, error: 'Tüm zorunlu alanları (ad, e-posta, şifre) doldurunuz.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Şifreniz en az 6 karakter olmalıdır.' };
    }

    const profiles = getAllProfiles();
    const existing = profiles.find((p) => p.email.toLowerCase() === data.email.toLowerCase().trim());
    if (existing) {
      return { success: false, error: 'Bu e-posta adresi ile zaten kayıtlı bir hesap bulunmaktadır.' };
    }

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      email: data.email.trim(),
      fullName: data.fullName.trim(),
      studentNumber: data.studentNumber?.trim() || `2301${Math.floor(1000 + Math.random() * 9000)}`,
      role: 'student', // Yeni kayıt her zaman öğrenci rolünü alır (Güvenlik kuralı)
      isMainAdmin: false,
      password: data.password, // Şifreli kayıt
      courseGroupId: 'group-1',
      courseGroupName: 'Şube A (Pazartesi 09:00 - 12:00)',
      createdAt: new Date().toISOString(),
    };

    saveProfile(newProfile);
    setCurrentUser(newProfile);
    setCurrentUserState(newProfile);
    refreshProfiles();
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
  };

  const assignUserRole = (targetUserId: string, newRole: UserRole): { success: boolean; error?: string } => {
    if (!currentUser) {
      return { success: false, error: 'Oturum açık değil.' };
    }
    const result = updateUserRole(currentUser.id, targetUserId, newRole);
    if (result.success) {
      refreshProfiles();
    }
    return result;
  };

  const isMainAdmin = Boolean(
    currentUser && (currentUser.isMainAdmin || currentUser.email === 'admin@wordlabtr.edu.tr')
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role ?? null,
        isAuthenticated: Boolean(currentUser),
        isMainAdmin,
        login,
        register,
        logout,
        assignUserRole,
        allProfiles,
        refreshProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
