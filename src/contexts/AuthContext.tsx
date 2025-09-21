'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, Trainer } from '@/types';
import { demoTrainers } from '@/lib/demoData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>(null);

  // Проверяем сохраненного тренера в localStorage при загрузке
  useEffect(() => {
    const savedTrainerId = localStorage.getItem('currentTrainerId');
    if (savedTrainerId) {
      const trainer = demoTrainers.find(t => t.id === savedTrainerId);
      if (trainer) {
        setCurrentTrainer(trainer);
      }
    }
  }, []);

  const login = (trainerId: string) => {
    const trainer = demoTrainers.find(t => t.id === trainerId);
    if (trainer) {
      setCurrentTrainer(trainer);
      localStorage.setItem('currentTrainerId', trainerId);
    }
  };

  const logout = () => {
    setCurrentTrainer(null);
    localStorage.removeItem('currentTrainerId');
  };

  const value: AuthContextType = {
    currentTrainer,
    login,
    logout,
    isAuthenticated: !!currentTrainer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
