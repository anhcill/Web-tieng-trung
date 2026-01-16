'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiTarget, FiAward } from 'react-icons/fi';
import examApi, { TopicStats } from '@/lib/api/exams';

interface StudyStatsProps {
  userName?: string;
  subjectCode: string;
}

export default function StudyStats({ userName = "Khánh Ly", subjectCode }: StudyStatsProps) {
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [subjectCode]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await examApi.getTopicStats(subjectCode);
      setTopicStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate overall stats
  const stats = {
    totalExams: topicStats.reduce((sum, t) => sum + t.total_questions, 0),
    averageScore: topicStats.length > 0 
      ? Math.round(topicStats.reduce((sum, t) => sum + (t.correct_answers / t.total_questions * 100), 0) / topicStats.length)
      : 0,
    bestScore: topicStats.length > 0
      ? Math.round(Math.max(...topicStats.map(t => t.correct_answers / t.total_questions * 100)))
      : 0,
    errorAnalysis: topicStats.map((topic, index) => ({
      type: topic.topic_name,
      percentage: Math.round(topic.error_percentage),
      color: ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'][index % 8]
    }))
  };

  return (
    <div className="space-y-6 sticky top-20">
      {/* User Study Corner */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <FiAward size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold">Góc học tập của {userName}</h3>
            <p className="text-sm text-blue-100">Theo dõi tiến độ của bạn</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <FiTarget className="mx-auto mb-1" size={20} />
            <p className="text-2xl font-bold">{stats.totalExams}</p>
            <p className="text-xs text-blue-100">Đề đã làm</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <FiTrendingUp className="mx-auto mb-1" size={20} />
            <p className="text-2xl font-bold">{stats.averageScore}</p>
            <p className="text-xs text-blue-100">Điểm TB</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <FiAward className="mx-auto mb-1" size={20} />
            <p className="text-2xl font-bold">{stats.bestScore}</p>
            <p className="text-xs text-blue-100">Điểm cao nhất</p>
          </div>
        </div>
      </div>

      {/* Error Analysis */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Phân tích dạng bài sai</h4>
        
        {/* Pie Chart Visual */}
        <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6">
          <svg viewBox="0 0 200 200" className="transform -rotate-90">
            {(() => {
              let currentAngle = 0;
              return stats.errorAnalysis.map((item, index) => {
                const angle = (item.percentage / 100) * 360;
                const startAngle = currentAngle;
                currentAngle += angle;
                
                const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
                const y2 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
                
                const largeArc = angle > 180 ? 1 : 0;
                
                const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
                
                return (
                  <path
                    key={index}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={colors[index]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                );
              });
            })()}
            <circle cx="100" cy="100" r="50" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.totalExams}</p>
              <p className="text-xs text-gray-500">Đề thi</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {stats.errorAnalysis.map((item, index) => {
            const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                  <span className="text-gray-700 text-xs">{item.type}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phân tích lỗ đảng bài sai - Text version */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">Phân tích lỗ đảng bài sai</h4>
        <div className="space-y-3">
          {stats.errorAnalysis.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.type}</span>
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
