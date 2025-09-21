// Типы данных для системы оценки учеников

export interface Student {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
}

export interface Trainer {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
}

export interface Grade {
  id: string;
  studentId: string;
  trainerId: string;
  score: number; // от 0 до 10
  comment?: string;
  createdAt: Date;
}

export interface StudentWithStats extends Student {
  grades: Grade[];
  averageScore: number;
  totalGrades: number;
}

export interface TrainerWithStats extends Trainer {
  totalGrades: number;
  averageGivenScore: number;
}

// Типы для форм
export interface GradeFormData {
  studentId: string;
  trainerId: string;
  score: number;
  comment?: string;
}

// Типы для контекста авторизации
export interface AuthContextType {
  currentTrainer: Trainer | null;
  login: (trainerId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
