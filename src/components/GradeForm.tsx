'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { GradeFormData } from '@/types';
import { isValidScore } from '@/lib/utils';

export default function GradeForm() {
  const { currentTrainer } = useAuth();
  const { students, addGrade } = useApp();
  const [formData, setFormData] = useState<GradeFormData>({
    studentId: '',
    trainerId: currentTrainer?.id || '',
    score: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidScore(formData.score)) {
      alert('Оценка должна быть от 0 до 10');
      return;
    }

    if (!formData.studentId) {
      alert('Выберите ученика');
      return;
    }

    setIsSubmitting(true);
    
    try {
      addGrade(formData);
      
      // Сброс формы
      setFormData({
        studentId: '',
        trainerId: currentTrainer?.id || '',
        score: 5,
        comment: '',
      });
      
      alert('Оценка успешно добавлена!');
    } catch (error) {
      console.error('Error adding grade:', error);
      alert('Ошибка при добавлении оценки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof GradeFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Выставить оценку
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="student" className="block text-sm font-medium text-gray-700">
            Ученик *
          </label>
          <select
            id="student"
            value={formData.studentId}
            onChange={(e) => handleInputChange('studentId', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Выберите ученика</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Оценка (0-10) *
          </label>
          <input
            type="number"
            id="score"
            min="0"
            max="10"
            step="1"
            value={formData.score}
            onChange={(e) => handleInputChange('score', parseInt(e.target.value) || 0)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Комментарий
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Дополнительные комментарии..."
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>Тренер: <span className="font-medium">{currentTrainer?.name}</span></p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить оценку'}
        </button>
      </form>
    </div>
  );
}
