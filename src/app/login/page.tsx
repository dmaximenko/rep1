'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

export default function LoginPage() {
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const { login } = useAuth();
  const { trainers } = useApp();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTrainerId) {
      login(selectedTrainerId);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в систему
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Выберите тренера для входа
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="trainer" className="block text-sm font-medium text-gray-700">
              Тренер
            </label>
            <select
              id="trainer"
              value={selectedTrainerId}
              onChange={(e) => setSelectedTrainerId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Выберите тренера</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedTrainerId}
            >
              Войти
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Доступные тренеры:</p>
            <ul className="mt-2 space-y-1">
              {trainers.map((trainer) => (
                <li key={trainer.id} className="text-sm">
                  • {trainer.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
