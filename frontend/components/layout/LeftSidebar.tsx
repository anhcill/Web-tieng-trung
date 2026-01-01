'use client';

import { FiFileText, FiMessageSquare, FiCreditCard, FiLogOut } from 'react-icons/fi';
import { BsCheckCircle, BsController, BsTrophy } from 'react-icons/bs';

export default function LeftSidebar() {
  const menuItems = [
    { icon: FiFileText, label: 'Bài viết của tôi', href: '/my-posts' },
    { icon: FiMessageSquare, label: 'Đóng góp ý kiến', href: '/feedback' },
    { icon: FiCreditCard, label: 'Nâng cấp tài khoản', href: '/upgrade' },
    { icon: FiLogOut, label: 'Đăng xuất', href: '/logout', danger: true },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl shadow-md border border-gray-100 p-5 space-y-5 sticky top-20 h-fit">
      {/* Profile Card */}
      <div className="text-center border-b border-gray-100 pb-5">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-50">
          <span className="text-white text-4xl font-bold">K</span>
        </div>

        {/* User Info */}
        <div className="space-y-0.5">
          <p className="text-xs text-blue-600 font-medium">@danghoc_CSCA</p>
          <h3 className="text-base font-bold text-gray-900">Khánh Ly</h3>
          <p className="text-xs text-gray-400 mb-2">CSCA5642774452</p>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            Số số số
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-blue-100">
          <BsCheckCircle className="mx-auto mb-1.5 text-blue-600" size={20} />
          <p className="text-[10px] text-gray-600 font-medium leading-tight">Kiểm Tra<br/>Định Kỳ</p>
          <p className="text-xl font-bold text-blue-700 mt-1">2</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-purple-100">
          <BsController className="mx-auto mb-1.5 text-purple-600" size={20} />
          <p className="text-[10px] text-gray-600 font-medium">Minigame</p>
          <p className="text-xl font-bold text-purple-700 mt-2">0</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-yellow-100">
          <BsTrophy className="mx-auto mb-1.5 text-yellow-600" size={20} />
          <p className="text-[10px] text-gray-600 font-medium">BXH</p>
          <p className="text-xl font-bold text-yellow-700 mt-2">-</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1 border-t border-gray-200 pt-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              item.danger
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
