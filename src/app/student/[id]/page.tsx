'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { getStudentStats } from '@/lib/utils';
import { formatDate, getScoreColor, getScoreBgColor } from '@/lib/utils';
import StudentCharts from '@/components/StudentCharts';

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, currentTrainer } = useAuth();
  const { students, grades, trainers } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  const studentId = params.id as string;
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ученик не найден</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const studentStats = getStudentStats(student, grades);

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer?.name || 'Неизвестный тренер';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2"
              >
                ← Назад к списку
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {student.name}
              </h1>
              {student.email && (
                <p className="mt-1 text-sm text-gray-600">
                  {student.email}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Тренер: {currentTrainer?.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-bold">#</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Всего оценок
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {studentStats.totalGrades}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-bold">★</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Средний балл
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {studentStats.totalGrades > 0 ? studentStats.averageScore.toFixed(1) : 'Нет оценок'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Дата регистрации
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {formatDate(student.createdAt).split(' ')[0]}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grades List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                История оценок
              </h2>
            </div>
            
            {studentStats.grades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Тренер
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Оценка
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Комментарий
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentStats.grades
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((grade, index) => (
                      <tr key={grade.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {getTrainerName(grade.trainerId)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreBgColor(grade.score)} ${getScoreColor(grade.score)}`}>
                              {grade.score}
                            </span>
                            <div className="ml-2 text-xs text-gray-500">
                              {grade.score >= 8 ? 'Отлично' : 
                               grade.score >= 6 ? 'Хорошо' : 
                               grade.score >= 4 ? 'Удовлетворительно' : 'Неудовлетворительно'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={grade.comment || 'Нет комментария'}>
                            {grade.comment || (
                              <span className="text-gray-400 italic">Нет комментария</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-col">
                            <span>{formatDate(grade.createdAt).split(' ')[0]}</span>
                            <span className="text-xs text-gray-400">
                              {formatDate(grade.createdAt).split(' ')[1]}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg">У этого ученика пока нет оценок</p>
                <p className="text-sm mt-2">Оценки появятся здесь после их выставления тренерами</p>
              </div>
            )}
          </div>

          {/* Графики и аналитика */}
          <div className="mt-8">
            <StudentCharts student={studentStats} />
          </div>
        </div>
      </main>
    </div>
  );
}
