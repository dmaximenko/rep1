import { Student, Trainer, Grade } from '@/types';

// Демо-данные: тренеры
export const demoTrainers: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Анна Петрова',
    email: 'anna.petrova@example.com',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'trainer-2',
    name: 'Михаил Сидоров',
    email: 'mikhail.sidorov@example.com',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'trainer-3',
    name: 'Елена Козлова',
    email: 'elena.kozlova@example.com',
    createdAt: new Date('2024-01-01'),
  },
];

// Демо-данные: ученики
export const demoStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Алексей Иванов',
    email: 'alexey.ivanov@example.com',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'student-2',
    name: 'Мария Смирнова',
    email: 'maria.smirnova@example.com',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: 'student-3',
    name: 'Дмитрий Волков',
    email: 'dmitry.volkov@example.com',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: 'student-4',
    name: 'Анна Морозова',
    email: 'anna.morozova@example.com',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'student-5',
    name: 'Сергей Лебедев',
    email: 'sergey.lebedev@example.com',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: 'student-6',
    name: 'Ольга Новикова',
    email: 'olga.novikova@example.com',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'student-7',
    name: 'Игорь Соколов',
    email: 'igor.sokolov@example.com',
    createdAt: new Date('2024-01-21'),
  },
  {
    id: 'student-8',
    name: 'Татьяна Кузнецова',
    email: 'tatyana.kuznetsova@example.com',
    createdAt: new Date('2024-01-22'),
  },
];

// Демо-данные: оценки
export const demoGrades: Grade[] = [
  // Алексей Иванов
  {
    id: 'grade-1',
    studentId: 'student-1',
    trainerId: 'trainer-1',
    score: 8,
    comment: 'Отличное выступление, хорошая техника',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'grade-2',
    studentId: 'student-1',
    trainerId: 'trainer-2',
    score: 7,
    comment: 'Хорошо, но нужно поработать над деталями',
    createdAt: new Date('2024-01-26'),
  },
  {
    id: 'grade-3',
    studentId: 'student-1',
    trainerId: 'trainer-3',
    score: 9,
    comment: 'Превосходно! Очень впечатлен',
    createdAt: new Date('2024-01-27'),
  },
  
  // Мария Смирнова
  {
    id: 'grade-4',
    studentId: 'student-2',
    trainerId: 'trainer-1',
    score: 6,
    comment: 'Неплохо, но есть над чем работать',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'grade-5',
    studentId: 'student-2',
    trainerId: 'trainer-2',
    score: 8,
    comment: 'Хороший прогресс',
    createdAt: new Date('2024-01-26'),
  },
  
  // Дмитрий Волков
  {
    id: 'grade-6',
    studentId: 'student-3',
    trainerId: 'trainer-1',
    score: 5,
    comment: 'Нужно больше практики',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'grade-7',
    studentId: 'student-3',
    trainerId: 'trainer-3',
    score: 6,
    comment: 'Постепенно улучшается',
    createdAt: new Date('2024-01-27'),
  },
  
  // Анна Морозова
  {
    id: 'grade-8',
    studentId: 'student-4',
    trainerId: 'trainer-2',
    score: 9,
    comment: 'Отличная работа!',
    createdAt: new Date('2024-01-26'),
  },
  {
    id: 'grade-9',
    studentId: 'student-4',
    trainerId: 'trainer-3',
    score: 8,
    comment: 'Очень хорошо',
    createdAt: new Date('2024-01-27'),
  },
  
  // Сергей Лебедев
  {
    id: 'grade-10',
    studentId: 'student-5',
    trainerId: 'trainer-1',
    score: 7,
    comment: 'Стабильный результат',
    createdAt: new Date('2024-01-25'),
  },
  
  // Ольга Новикова
  {
    id: 'grade-11',
    studentId: 'student-6',
    trainerId: 'trainer-2',
    score: 8,
    comment: 'Хорошо подготовлена',
    createdAt: new Date('2024-01-26'),
  },
  {
    id: 'grade-12',
    studentId: 'student-6',
    trainerId: 'trainer-3',
    score: 7,
    comment: 'Неплохо, продолжай в том же духе',
    createdAt: new Date('2024-01-27'),
  },
  
  // Игорь Соколов
  {
    id: 'grade-13',
    studentId: 'student-7',
    trainerId: 'trainer-1',
    score: 6,
    comment: 'Есть потенциал',
    createdAt: new Date('2024-01-25'),
  },
  
  // Татьяна Кузнецова
  {
    id: 'grade-14',
    studentId: 'student-8',
    trainerId: 'trainer-2',
    score: 9,
    comment: 'Превосходно!',
    createdAt: new Date('2024-01-26'),
  },
  {
    id: 'grade-15',
    studentId: 'student-8',
    trainerId: 'trainer-3',
    score: 8,
    comment: 'Отличная работа',
    createdAt: new Date('2024-01-27'),
  },
];
