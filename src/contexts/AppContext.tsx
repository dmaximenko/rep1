'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Trainer, Grade, GradeFormData } from '@/types';
import { demoTrainers, demoStudents, demoGrades } from '@/lib/demoData';

interface AppContextType {
  students: Student[];
  trainers: Trainer[];
  grades: Grade[];
  addGrade: (gradeData: GradeFormData) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(demoStudents);
  const [trainers, setTrainers] = useState<Trainer[]>(demoTrainers);
  const [grades, setGrades] = useState<Grade[]>(demoGrades);

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const savedGrades = localStorage.getItem('grades');
    if (savedGrades) {
      try {
        const parsedGrades = JSON.parse(savedGrades).map((grade: any) => ({
          ...grade,
          createdAt: new Date(grade.createdAt),
        }));
        setGrades(parsedGrades);
      } catch (error) {
        console.error('Error parsing saved grades:', error);
      }
    }
  }, []);

  // Сохраняем оценки в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  const addGrade = (gradeData: GradeFormData) => {
    const newGrade: Grade = {
      id: `grade-${Date.now()}`,
      studentId: gradeData.studentId,
      trainerId: gradeData.trainerId,
      score: gradeData.score,
      comment: gradeData.comment,
      createdAt: new Date(),
    };
    
    setGrades(prev => [...prev, newGrade]);
  };

  const refreshData = () => {
    // В реальном приложении здесь был бы запрос к API
    // Пока просто перезагружаем страницу
    window.location.reload();
  };

  const value: AppContextType = {
    students,
    trainers,
    grades,
    addGrade,
    refreshData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
