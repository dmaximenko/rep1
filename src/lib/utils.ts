import { Student, Trainer, Grade, StudentWithStats } from '@/types';

// Вычисление среднего балла для ученика
export function calculateAverageScore(grades: Grade[]): number {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, grade) => acc + grade.score, 0);
  return Math.round((sum / grades.length) * 10) / 10; // округляем до 1 знака после запятой
}

// Получение статистики по ученику
export function getStudentStats(student: Student, grades: Grade[]): StudentWithStats {
  const studentGrades = grades.filter(grade => grade.studentId === student.id);
  const averageScore = calculateAverageScore(studentGrades);
  
  return {
    ...student,
    grades: studentGrades,
    averageScore,
    totalGrades: studentGrades.length,
  };
}

// Получение всех учеников со статистикой
export function getAllStudentsWithStats(students: Student[], grades: Grade[]): StudentWithStats[] {
  return students.map(student => getStudentStats(student, grades));
}

// Форматирование даты
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Форматирование оценки
export function formatScore(score: number): string {
  return score.toFixed(1);
}

// Валидация оценки
export function isValidScore(score: number): boolean {
  return score >= 0 && score <= 10 && Number.isInteger(score);
}

// Получение цвета для оценки
export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-red-600';
}

// Получение фона для оценки
export function getScoreBgColor(score: number): string {
  if (score >= 8) return 'bg-green-100';
  if (score >= 6) return 'bg-yellow-100';
  return 'bg-red-100';
}
