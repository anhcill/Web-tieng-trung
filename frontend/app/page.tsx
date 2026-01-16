import Banner from '@/components/layout/Banner';
import Header from '@/components/layout/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header />
      
      {/* Banner - Full Width */}
      <div className="px-6 py-8">
        <div className="max-w-[1920px] mx-auto">
          <Banner />
        </div>
      </div>
      
      <main className="container mx-auto px-6 py-12 max-w-[1400px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chào mừng đến với CSCA
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nền tảng luyện thi tiếng Trung toàn diện
          </p>
          <Link 
            href="/forum"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-lg font-semibold"
          >
            Vào Diễn Đàn
          </Link>
        </div>
      </main>
    </div>
  );
}
