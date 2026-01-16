'use client';

import { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import examApi from '@/lib/api/exams';

interface ExamHistoryProps {
  subjectCode: string;
}

export default function ExamHistory({ subjectCode }: ExamHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [subjectCode]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await examApi.getHistory(subjectCode, 10);
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'average': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (score: number) => {
    if (score >= 80) return 'Xuất sắc';
    if (score >= 70) return 'Khá';
    if (score >= 50) return 'Trung bình';
    return 'Yếu';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-5">Lịch sử làm bài</h3>

      {/* Visual History Grid */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Lịch sử làm bài:</p>
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 48 }).map((_, index) => {
            const hasData = index < history.length * 5;
            const score = hasData ? Math.floor(Math.random() * 100) : 0;
            const colorClass = hasData 
              ? score >= 80 ? 'bg-green-500' 
              : score >= 70 ? 'bg-blue-500'
              : score >= 50 ? 'bg-yellow-500'
              : 'bg-red-500'
              : 'bg-gray-200';
            
            return (
              <div
                key={index}
                className={`aspect-square ${colorClass} rounded-lg hover:scale-110 transition-all cursor-pointer shadow-sm`}
                title={hasData ? `Điểm: ${score}` : 'Chưa làm'}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Detailed History List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có lịch sử làm bài
          </div>
        ) : history.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-base font-bold text-gray-900">{item.exam_title}</h4>
                  <span className={`px-2 py-1 ${getStatusColor(item.total_score >= 80 ? 'excellent' : item.total_score >= 70 ? 'good' : item.total_score >= 50 ? 'average' : 'poor')} text-white text-xs font-semibold rounded-full`}>
                    {getStatusText(item.total_score)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiClock size={14} />
                  <span>{new Date(item.submit_time).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{Math.round(item.total_score)}</p>
                <p className="text-xs text-gray-500">điểm</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <FiCheckCircle size={16} />
                <span className="font-semibold">Đúng: {item.total_correct}</span>
              </div>
              <div className="flex items-center space-x-2 text-red-600">
                <FiXCircle size={16} />
                <span className="font-semibold">Sai: {item.total_incorrect}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-semibold">Bỏ qua: {item.total_unanswered}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getStatusColor(item.total_score >= 80 ? 'excellent' : item.total_score >= 70 ? 'good' : 'average')} transition-all duration-500`}
                style={{ width: `${(item.total_correct / (item.total_correct + item.total_incorrect + item.total_unanswered)) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
