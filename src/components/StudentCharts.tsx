'use client';

import { StudentWithStats } from '@/types';
import { formatDate } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface StudentChartsProps {
  student: StudentWithStats;
}

export default function StudentCharts({ student }: StudentChartsProps) {
  // Данные для графика прогресса оценок по времени
  const progressData = student.grades
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((grade, index) => ({
      date: formatDate(grade.createdAt).split(' ')[0], // только дата
      score: grade.score,
      cumulative: index === 0 ? grade.score : 
        student.grades
          .slice(0, index + 1)
          .reduce((sum, g) => sum + g.score, 0) / (index + 1)
    }));

  // Данные для распределения оценок
  const scoreDistribution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => ({
    score,
    count: student.grades.filter(g => g.score === score).length
  }));

  // Данные для круговой диаграммы по тренерам
  const trainerData = student.grades.reduce((acc, grade) => {
    const existing = acc.find(item => item.trainerId === grade.trainerId);
    if (existing) {
      existing.count += 1;
      existing.totalScore += grade.score;
    } else {
      acc.push({
        trainerId: grade.trainerId,
        count: 1,
        totalScore: grade.score
      });
    }
    return acc;
  }, [] as Array<{trainerId: string, count: number, totalScore: number}>)
  .map(item => ({
    name: `Тренер ${item.trainerId.split('-')[1]}`, // упрощенное имя
    value: item.count,
    averageScore: Math.round((item.totalScore / item.count) * 10) / 10
  }));

  // Цвета для графиков
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Данные для радарной диаграммы (если есть достаточно оценок)
  const radarData = student.grades.length >= 3 ? [
    {
      subject: 'Средний балл',
      A: student.averageScore,
      fullMark: 10
    },
    {
      subject: 'Количество оценок',
      A: Math.min(student.totalGrades * 2, 10), // масштабируем до 10
      fullMark: 10
    },
    {
      subject: 'Прогресс',
      A: student.grades.length > 1 ? 
        Math.max(0, student.grades[student.grades.length - 1].score - student.grades[0].score) + 5 : 5,
      fullMark: 10
    }
  ] : [];

  if (student.grades.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Аналитика</h3>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-4">📈</div>
          <p>Графики появятся после получения первых оценок</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* График прогресса оценок */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Прогресс оценок</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'score' ? `${value} баллов` : `${value.toFixed(1)} баллов`,
                  name === 'score' ? 'Оценка' : 'Средний балл'
                ]}
                labelFormatter={(label) => `Дата: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Оценка"
              />
              <Line 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                name="Средний балл"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Распределение оценок */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Распределение оценок</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="score" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value} раз`, 'Количество']}
                  labelFormatter={(label) => `Оценка: ${label}`}
                />
                <Bar 
                  dataKey="count" 
                  fill="#8B5CF6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Оценки по тренерам */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 Оценки по тренерам</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trainerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, averageScore }) => 
                    `${name}: ${value} (${averageScore})`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trainerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} оценок`,
                    `${props.payload.averageScore} средний балл`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Радарная диаграмма (если достаточно данных) */}
      {radarData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Общая статистика</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis 
                  domain={[0, 10]} 
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Показатели"
                  dataKey="A"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toFixed(1)} из 10`,
                    'Показатель'
                  ]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Дополнительная статистика */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Дополнительная статистика</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {student.grades.length > 0 ? Math.max(...student.grades.map(g => g.score)) : 0}
            </div>
            <div className="text-sm text-gray-600">Максимальная оценка</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {student.grades.length > 0 ? Math.min(...student.grades.map(g => g.score)) : 0}
            </div>
            <div className="text-sm text-gray-600">Минимальная оценка</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {student.grades.length > 0 ? 
                student.grades[student.grades.length - 1].score - student.grades[0].score : 0
              }
            </div>
            <div className="text-sm text-gray-600">Прогресс</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {student.grades.length > 0 ? 
                Math.round(student.grades.filter(g => g.score >= 8).length / student.grades.length * 100) : 0
              }%
            </div>
            <div className="text-sm text-gray-600">Высокие оценки</div>
          </div>
        </div>
      </div>
    </div>
  );
}
