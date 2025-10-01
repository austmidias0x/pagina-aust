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
          <div className="flex justify-center">
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
