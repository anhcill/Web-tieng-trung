'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiTarget, FiTrendingUp, FiAward } from 'react-icons/fi';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Chinh phục kỳ thi CSCA 2026',
      subtitle: 'Cùng hàng ngàn học viên đạt học bổng toàn phần',
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      icon: FiTarget,
      stats: '10,000+ học viên',
      bgImage: '/images/image-1768568763486.png',
    },
    {
      id: 2,
      title: 'Du học Trung Quốc - Cơ hội vàng',
      subtitle: 'Học bổng toàn phần tại các trường đại học hàng đầu',
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      icon: FiTrendingUp,
      stats: '95% đạt học bổng',
      bgImage: '/images/image-1768568705006.png',
    },
    {
      id: 3,
      title: 'Trường đại học danh tiếng',
      subtitle: 'Top 100 trường hàng đầu châu Á chờ đợi bạn',
      gradient: 'from-orange-600 via-pink-600 to-rose-600',
      icon: FiAward,
      stats: 'Tương lai rộng mở',
      bgImage: '/images/image-1768568694727.png',
    },
    {
      id: 4,
      title: 'Đại học Nhân Dân Trung Quốc',
      subtitle: 'Môi trường học tập hiện đại, chất lượng quốc tế',
      gradient: 'from-red-600 via-rose-600 to-pink-600',
      icon: FiAward,
      stats: 'Top 1% thế giới',
      bgImage: '/images/image-1768568753620.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[40rem] rounded-3xl overflow-hidden shadow-2xl mb-6">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} relative overflow-hidden`}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.bgImage})`,
                imageRendering: 'crisp-edges',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-12">
              <div className="max-w-2xl">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                  <slide.icon className="text-white" size={32} />
                </div>

                {/* Title */}
                <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl text-white/90 mb-6">
                  {slide.subtitle}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/30">
                  <slide.icon className="text-white" size={24} />
                  <span className="text-white font-bold text-lg">{slide.stats}</span>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 transform">
                    Bắt đầu ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all group z-20"
      >
        <FiChevronLeft className="text-white group-hover:scale-125 transition-transform" size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all group z-20"
      >
        <FiChevronRight className="text-white group-hover:scale-125 transition-transform" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-white rounded-full'
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
