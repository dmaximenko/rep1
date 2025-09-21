'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';
import { getAllStudentsWithStats } from '@/lib/utils';
import { getScoreColor, getScoreBgColor } from '@/lib/utils';

export default function StudentsTable() {
  const { students, grades, refreshTrigger } = useApp();
  const [localRefreshTrigger, setLocalRefreshTrigger] = useState(0);
  
  const studentsWithStats = getAllStudentsWithStats(students, grades);

  // Обновляем локальный триггер при изменении глобального
  useEffect(() => {
    setLocalRefreshTrigger(refreshTrigger);
  }, [refreshTrigger]);

  // Отладочная информация
  useEffect(() => {
    console.log('StudentsTable: grades updated', grades.length, 'grades');
    console.log('StudentsTable: students with stats', studentsWithStats.map(s => ({
      name: s.name,
      totalGrades: s.totalGrades,
      averageScore: s.averageScore
    })));
  }, [grades, studentsWithStats]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Ученики: средний балл
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ученик
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Количество оценок
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Средний балл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentsWithStats.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {student.name}
                  </div>
                  {student.email && (
                    <div className="text-sm text-gray-500">
                      {student.email}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {student.totalGrades}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.totalGrades > 0 ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreBgColor(student.averageScore)} ${getScoreColor(student.averageScore)}`}>
                      {student.averageScore.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Нет оценок
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/student/${student.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Подробнее
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {studentsWithStats.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500">
          Нет данных об учениках
        </div>
      )}
    </div>
  );
}
