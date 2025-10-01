'use client';

import { useState, useEffect } from 'react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { SubscriptionModal } from './subscription-modal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll quando o menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
            <ShimmerButton 
              onClick={() => setIsModalOpen(true)}
              shimmerColor="#000000"
              shimmerSize="0.15em"
              shimmerDuration="2.5s"
              borderRadius="4px"
              background="rgba(255, 255, 255, 1)"
              className="px-5 py-2 text-sm font-medium text-black"
            >
              Ativar Próximo Nível
            </ShimmerButton>
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

      </div>

      {/* Backdrop Overlay - Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ top: '0', zIndex: 40 }}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-black border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col h-full">
          {/* Header do Menu Mobile */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-xl font-light text-white">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6 px-6">
            <div className="flex flex-col space-y-6">
              <button 
                onClick={() => scrollToSection('essencia')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left text-lg font-light"
              >
                Essência
              </button>
              <button 
                onClick={() => scrollToSection('metodo')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left text-lg font-light"
              >
                Método
              </button>
              <button 
                onClick={() => scrollToSection('niveis')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left text-lg font-light"
              >
                Níveis
              </button>
              <button 
                onClick={() => scrollToSection('jornada')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left text-lg font-light"
              >
                Jornada
              </button>
              <button 
                onClick={() => scrollToSection('como-trabalhamos')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left text-lg font-light"
              >
                Como Trabalhamos
              </button>
            </div>
          </nav>

          {/* Footer do Menu Mobile com Botão CTA */}
          <div className="p-6 border-t border-white/10">
            <ShimmerButton 
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              shimmerColor="#000000"
              shimmerSize="0.15em"
              shimmerDuration="2.5s"
              borderRadius="4px"
              background="rgba(255, 255, 255, 1)"
              className="w-full px-5 py-3 text-sm font-medium text-black"
            >
              Ativar Próximo Nível
            </ShimmerButton>
          </div>
        </div>
      </div>

      {/* Modal de Inscrição */}
      <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </nav>
  );
}
