'use client';

import { useState } from 'react';
import { FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const subjects = [
    { id: 'toan', name: 'TOÁN', color: 'bg-blue-600' },
    { id: 'vatly', name: 'VẬT LÝ', color: 'bg-purple-600' },
    { id: 'hoahoc', name: 'HÓA HỌC', color: 'bg-green-600' },
    { id: 'tiengtrung-xh', name: 'TIẾNG TRUNG\nXà HỘI', color: 'bg-orange-600' },
    { id: 'tiengtrung-tn', name: 'TIẾNG TRUNG\nTỰ NHIÊN', color: 'bg-red-600' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-xl sticky top-0 z-50 border-b border-blue-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-white font-bold text-xl tracking-widest hover:text-blue-100 transition-all">
              CSCA
            </a>

            {/* Menu môn học */}
            <nav className="hidden md:flex items-center space-x-0.5">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setActiveMenu(subject.id)}
                  className={`px-3 py-2 text-white text-xs font-semibold uppercase tracking-wide transition-all hover:bg-white/15 whitespace-pre-line leading-tight ${
                    activeMenu === subject.id ? 'bg-white/25 shadow-md' : ''
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search & User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Bạn đang thắc mắc điều gì?"
                className="w-72 px-5 py-2 pr-10 rounded-full bg-white/15 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 transition-all backdrop-blur-sm text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors">
                <FiSearch className="text-white" size={16} />
              </button>
            </div>

            {/* Mobile search button */}
            <button className="lg:hidden p-2 text-white hover:bg-white/20 rounded-full transition-colors">
              <FiSearch size={22} />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <div className="w-9 h-9 bg-white/30 rounded-full flex items-center justify-center">
                  <FiUser size={20} />
                </div>
                <FiChevronDown size={18} className="hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                  <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors">
                    Hồ sơ cá nhân
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors">
                    Cài đặt
                  </a>
                  <hr className="my-2" />
                  <a href="/logout" className="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    Đăng xuất
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
