'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      <div className={`max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-light mb-8 text-white tracking-tight">
            AUST CORP
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            A Próxima Geração de Empresas Começa Aqui
          </p>
        </div>
        
        <div className="space-y-8 mb-16">
          <p className="text-xl md:text-2xl font-light text-white max-w-4xl mx-auto leading-relaxed">
            Empreender é a arte de expressar sua essência em escala.
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Desenvolvemos sua essência e estruturamos sua escala.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300">
            Descobrir Sua Essência
          </button>
          <button className="px-8 py-3 border border-gray-600 text-gray-300 font-medium hover:border-gray-400 hover:text-white transition-all duration-300">
            Conhecer a Jornada
          </button>
        </div>
      </div>
      
      {/* Minimal scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-8 bg-gray-600"></div>
      </div>
    </section>
  );
}
