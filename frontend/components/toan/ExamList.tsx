'use client';

import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';
import examApi, { Exam } from '@/lib/api/exams';

interface ExamListProps {
  subjectCode: string;
}

export default function ExamList({ subjectCode }: ExamListProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, [subjectCode]);

  const loadExams = async () => {
    try {
      setLoading(true);
      const data = await examApi.getExamsBySubject(subjectCode);
      setExams(data);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group exams by publish date
  const groupedExams = exams.reduce((acc, exam) => {
    const date = exam.publish_date ? new Date(exam.publish_date).toLocaleDateString('vi-VN') : 'Chưa công bố';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Đang tải đề thi...</p>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
        <p className="text-gray-500 text-lg">Chưa có đề thi nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedExams).map(([date, dateExams]) => (
        <div key={date} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Date Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3">
            <div className="flex items-center space-x-2 text-white">
              <FiCalendar size={18} />
              <span className="font-semibold text-base">Ngày {date}</span>
            </div>
          </div>

          {/* Exam List */}
          <div className="divide-y divide-gray-100">
            {dateExams.map((exam) => (
              <div
                key={exam.id}
                className={`p-5 hover:bg-blue-50/50 transition-all cursor-pointer group ${
                  exam.user_attempt_count > 0 ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {exam.title}
                      </h3>
                      {exam.user_attempt_count > 0 && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Đã làm {exam.user_attempt_count} lần
                        </span>
                      )}
                      {exam.user_best_score > 0 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          Điểm cao nhất: {exam.user_best_score}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1.5">
                        <FiClock size={16} />
                        <span>{exam.duration} phút</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <FiUsers size={16} />
                        <span>{exam.total_questions} câu</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {exam.difficulty_level === 'easy' ? 'Dễ' : exam.difficulty_level === 'medium' ? 'TB' : 'Khó'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = `/exam/${exam.id}`}
                    className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2 group-hover:scale-105"
                  >
                    <span>{exam.user_attempt_count > 0 ? 'Làm lại' : 'Làm bài'}</span>
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
