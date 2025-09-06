'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-light text-white">
            AUST
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('essencia')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Essência
            </button>
            <button 
              onClick={() => scrollToSection('metodo')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Método
            </button>
            <button 
              onClick={() => scrollToSection('niveis')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Níveis
            </button>
            <button 
              onClick={() => scrollToSection('jornada')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Jornada
            </button>
            <button 
              onClick={() => scrollToSection('como-trabalhamos')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Como Trabalhamos
            </button>
            <button className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300">
              Conversar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-80 mt-4' : 'max-h-0'
        }`}>
          <div className="flex flex-col space-y-4 py-4 border-t border-white/10">
            <button 
              onClick={() => scrollToSection('essencia')}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Essência
            </button>
            <button 
              onClick={() => scrollToSection('metodo')}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Método
            </button>
            <button 
              onClick={() => scrollToSection('niveis')}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Níveis
            </button>
            <button 
              onClick={() => scrollToSection('jornada')}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Jornada
            </button>
            <button 
              onClick={() => scrollToSection('como-trabalhamos')}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Como Trabalhamos
            </button>
            <button className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 w-fit">
              Conversar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
