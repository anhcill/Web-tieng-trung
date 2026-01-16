'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getUserById, getUserStats, UserStats } from '@/lib/api/users';
import { User } from '@/lib/api/auth';
import ProfileCard from '@/components/profile/ProfileCard';
import EditProfileForm from '@/components/profile/EditProfileForm';
import { FiEdit2, FiAward, FiBook, FiMessageSquare, FiTarget } from 'react-icons/fi';

export default function ProfilePage() {
  const { user: currentUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const [userResponse, statsResponse] = await Promise.all([
          getUserById(currentUser.id),
          getUserStats(currentUser.id),
        ]);
        
        setUser(userResponse.data.user);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Không tìm thấy thông tin người dùng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-10"></div>
        {/* Decorative circles */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 -mt-48 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                {/* Avatar with ring */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.display_name}
                      className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center transform group-hover:scale-105 transition duration-300">
                      <span className="text-5xl font-bold text-white">
                        {user.display_name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                {/* User Info */}
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {user.display_name || user.full_name}
                  </h1>
                  <p className="text-gray-600 mb-3 flex items-center space-x-2">
                    <span className="text-lg">@{user.username}</span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </p>
                  {user.bio && (
                    <p className="text-gray-700 max-w-md leading-relaxed bg-gray-50 px-4 py-2 rounded-lg">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              {currentUser?.id === user.id && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FiEdit2 size={18} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-medium">{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
                </button>
              )}
            </div>

            {/* Target Score Badge */}
            {user.target_score && (
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-xl shadow-lg">
                <FiTarget size={22} />
                <span className="font-bold text-lg">Mục tiêu: {user.target_score} điểm</span>
              </div>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Chỉnh sửa thông tin
              </h2>
              <EditProfileForm user={user} onUpdate={handleProfileUpdate} onCancel={() => setIsEditing(false)} />
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Exams */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiBook className="text-white" size={26} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Đề thi đã làm</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {stats?.total_exams || 0}
              </p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>

            {/* Avg Score */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiAward className="text-white" size={26} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Điểm trung bình</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
                {stats?.avg_score || 0}
              </p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            {/* Total Posts */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiMessageSquare className="text-white" size={26} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Bài viết</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {stats?.total_posts || 0}
              </p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '50%'}}></div>
              </div>
            </div>

            {/* Highest Score */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiTarget className="text-white" size={26} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Điểm cao nhất</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                {stats?.highest_score || 0}
              </p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
