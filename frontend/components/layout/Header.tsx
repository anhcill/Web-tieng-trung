'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiUser, FiChevronDown, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const subjects = [
    { id: 'toan', name: 'TOÁN', href: '/mon/toan', color: 'bg-blue-600' },
    { id: 'vatly', name: 'VẬT LÝ', href: '/mon/vatly', color: 'bg-purple-600' },
    { id: 'hoahoc', name: 'HÓA HỌC', href: '/mon/hoa', color: 'bg-green-600' },
    { id: 'sinhhoc', name: 'SINH HỌC', href: '/mon/sinh', color: 'bg-emerald-600' },
    { id: 'tiengtrung-xh', name: 'TIẾNG TRUNG\nXà HỘI', href: '/tiengtrung-xahoi', color: 'bg-orange-600' },
    { id: 'tiengtrung-tn', name: 'TIẾNG TRUNG\nTỰ NHIÊN', href: '/tiengtrung-tunhien', color: 'bg-red-600' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-xl sticky top-0 z-50 border-b border-blue-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-2xl tracking-widest hover:text-blue-100 transition-all flex-shrink-0">
            CSCA
          </Link>

          {/* Menu môn học - CENTERED */}
          <nav className="hidden md:flex items-center justify-center space-x-1 flex-1">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={subject.href}
                onClick={() => setActiveMenu(subject.id)}
                className={`px-4 py-2 text-white text-xs font-bold uppercase tracking-wide transition-all hover:bg-white/20 whitespace-pre-line leading-tight rounded-lg ${
                  activeMenu === subject.id ? 'bg-white/30 shadow-lg scale-105' : ''
                }`}
              >
                {subject.name}
              </Link>
            ))}
          </nav>

          {/* Search & User */}
          <div className="flex items-center space-x-4 flex-shrink-0">
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
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    <div className="w-9 h-9 bg-white/30 rounded-full flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.display_name} className="w-full h-full object-cover" />
                      ) : (
                        <FiUser size={20} />
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{user.display_name}</span>
                    <FiChevronDown size={18} className="hidden sm:block" />
                  </button>

                  {/* Dropdown Menu - Logged In */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                      <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors">
                        Hồ sơ cá nhân
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors">
                        Cài đặt
                      </Link>
                      <hr className="my-2" />
                      <button 
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-1 px-4 py-2 text-white hover:bg-white/20 rounded-full transition-colors text-sm font-medium"
                  >
                    <FiLogIn size={18} />
                    <span className="hidden sm:inline">Đăng nhập</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center space-x-1 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-full transition-colors text-sm font-medium"
                  >
                    <FiUserPlus size={18} />
                    <span className="hidden sm:inline">Đăng ký</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
