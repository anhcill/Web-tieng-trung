'use client';

import { FiFileText, FiBook, FiTarget, FiTrendingUp, FiLayers, FiCalendar, FiUser } from 'react-icons/fi';

export default function RightSidebar() {
  const menuItems = [
    { icon: FiLayers, label: 'Cấu trúc đề', href: '/structure', color: 'text-blue-600' },
    { icon: FiBook, label: 'Lý Thuyết', href: '/theory', color: 'text-green-600' },
    { icon: FiTarget, label: 'Tự vững', href: '/practice', color: 'text-purple-600' },
    { icon: FiFileText, label: 'Đề mô phỏng', href: '/mock-tests', color: 'text-orange-600' },
    { icon: FiTrendingUp, label: 'Tự luận nâng cao', href: '/advanced', color: 'text-red-600' },
    { icon: FiCalendar, label: 'Lịch sử làm bài', href: '/history', color: 'text-indigo-600' },
    { icon: FiUser, label: 'Lộ trình học cá nhân', href: '/roadmap', color: 'text-pink-600' },
    { icon: FiUser, label: 'Tài khoản', href: '/account', color: 'text-gray-600' },
  ];

  return (
    <aside className="w-full lg:w-56 space-y-3">
      {/* Quick Menu Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sticky top-20">
        <nav className="space-y-0.5">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-50 group`}
            >
              <item.icon size={16} className={`flex-shrink-0 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
