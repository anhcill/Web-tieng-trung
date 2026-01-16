'use client';

import { useState } from 'react';
import { FiHeart, FiMessageCircle, FiSearch } from 'react-icons/fi';

interface Post {
  id: number;
  username: string;
  displayName: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  avatar: string;
}

export default function ForumFeed() {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      username: '@so_exec_studiem',
      displayName: 'Sinh viên exec',
      time: '15 phút trước',
      content: 'Lịch thi CSCA sắp tới bao giờ mở vậy a',
      likes: 2,
      comments: 3,
      avatar: 'SE',
    },
    {
      id: 2,
      username: '@veng_studiem',
      displayName: 'Veng Student',
      time: '25 phút trước',
      content: 'Có ai lập nhóm ôn Toán CSCA không a',
      likes: 7,
      comments: 10,
      avatar: 'VS',
    },
    {
      id: 3,
      username: '@CSCA_QTV',
      displayName: 'CSCA Admin',
      time: '1 giờ trước',
      content: '20h tối nay bài thi thử CSCA đợt 1 đã sẵn sàng đợt 3',
      likes: 30,
      comments: 14,
      avatar: 'QTV',
    },
  ]);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'following', label: 'Yêu thích' },
    { id: 'notifications', label: 'Thông báo' },
    { id: 'qtv', label: 'QTV' },
  ];

  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-5">
      {/* Search Box */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Bạn đang thắc mắc điều gì?"
            className="w-full px-6 py-3.5 pr-14 rounded-full bg-blue-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-100 transition-all text-base"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-all hover:scale-105 shadow-md">
            <FiSearch size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-5 py-3.5 text-base font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-t from-blue-50 to-transparent'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-50">
          {posts.map((post) => (
            <div key={post.id} className="p-5 hover:bg-blue-50/30 transition-all cursor-pointer">
              <div className="flex space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-50">
                    <span className="text-white text-sm font-bold">{post.avatar}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-blue-600 font-semibold text-base hover:underline cursor-pointer">{post.username}</span>
                    <span className="text-gray-400 text-sm">{post.time}</span>
                  </div>
                  <p className="text-gray-700 text-base mb-3 leading-relaxed">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all group">
                      <FiHeart size={18} className="group-hover:fill-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all group">
                      <FiMessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-base font-medium">{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
