'use client';

import { useState } from 'react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { SubscriptionModal } from './subscription-modal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="py-24 px-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-white">
            Pronto para expressar sua essência em escala?
          </h2>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nossa missão é formar empresas que crescem mantendo identidade. Negócios que escalam sem perder o que os torna únicos. 
            Empreendedores que encontraram forma de viver através do que constroem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <ShimmerButton 
              onClick={() => setIsModalOpen(true)}
              shimmerColor="#000000"
              shimmerSize="0.15em"
              shimmerDuration="2.5s"
              borderRadius="4px"
              background="rgba(255, 255, 255, 1)"
              className="px-8 py-3 font-medium text-black shadow-2xl"
            >
              Ativar o Próximo Nível
            </ShimmerButton>
            <a 
              href="https://wa.link/lyeqyo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded"
            >
              Contate-nos
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">AUST Corp</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A próxima geração de empresas começa aqui. Desenvolvemos sua essência e estruturamos sua escala.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Nossos Níveis</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Academy - Desenvolva sua forma de pensar</li>
              <li>Agency - Nossa equipe no seu negócio</li>
              <li>Tech - Vantagem tecnológica para sua essência</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Contato</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>austmidias@gmail.com</p>
              <p>austcorp.io</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          {/* Ícones de Redes Sociais */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <a 
              href="https://wa.link/lyeqyo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/thalesaust?utm_source=ig_web_button_share_sheet&igsh=MTd4eTlhZmRtenI2OA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@ThalesAust"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <p>&copy; 2024 AUST Corp. Todos os direitos reservados.</p>
          <p className="mt-2">
            Empreender é a arte de expressar sua essência em escala.
          </p>
        </div>
      </div>

      {/* Modal de Inscrição */}
      <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </footer>
  );
}
