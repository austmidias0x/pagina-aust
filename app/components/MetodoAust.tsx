'use client';

import { useState, useEffect, useRef } from 'react';

export default function MetodoAust() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Por que empresas sem essência vão se minar */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-l border-gray-700 pl-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">
              Por que empresas sem essência vão se minar
            </h3>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                As pessoas desenvolveram sensibilidade para detectar incongruência. Conseguem perceber quando uma marca 
                é apenas um conjunto de técnicas de marketing aplicadas sobre um produto qualquer.
              </p>
              
              <p>
                Consumidores hoje escolhem empresas que representam algo que ressoa com sua própria essência. 
                Não compram produtos, compram manifestações de visões de mundo com as quais se identificam.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="border-l-2 border-gray-600 pl-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-200">Empresa sem essência</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Precisa competir no nível das commodities. Preço, conveniência, funcionalidade básica... 
                    Um jogo de soma zero onde quem tem custos menores vence.
                  </p>
                </div>
                
                <div className="border-l-2 border-white pl-6">
                  <h4 className="text-lg font-medium mb-3 text-white">Empresa com essência</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Compete no nível da irreplicabilidade. Ninguém mais pode oferecer exatamente o que você oferece 
                    porque ninguém mais é exatamente quem você é.
                  </p>
                </div>
              </div>
              
              <p className="text-white mt-8">
                Essa mudança já começou. Empresas que insistem no modelo antigo de "fazer negócio" estão perdendo 
                relevância para aquelas que operam como expressões de essência.
              </p>
            </div>
          </div>
        </div>

        {/* O método AUST */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            O método AUST: DNA e Estrutura
          </h2>

          <div className="border-l border-gray-700 pl-8">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Trabalhamos com dois pilares interdependentes: desenvolvimento da essência (DNA) e construção da estrutura.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="border-l-2 border-gray-600 pl-6">
                <h4 className="text-lg font-medium mb-3 text-gray-200">Essência sem estrutura</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  É apenas potencial não manifestado. Você tem algo valioso para oferecer ao mundo, 
                  mas não consegue expressar isso de forma que as pessoas compreendam e se conectem.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-600 pl-6">
                <h4 className="text-lg font-medium mb-3 text-gray-200">Estrutura sem essência</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Você domina ferramentas, processos, métricas, mas constrói algo genérico que qualquer pessoa 
                  com as mesmas técnicas poderia replicar.
                </p>
              </div>

              <div className="border-l-2 border-white pl-6">
                <h4 className="text-lg font-medium mb-3 text-white">A relação simbiótica</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  A relação entre DNA e estrutura é simbiótica. Sua essência informa como você deve estruturar. 
                  Sua estrutura amplifica como sua essência se manifesta.
                </p>
                <p className="text-white text-sm">
                  Identificamos primeiro quem você é em essência. Depois construímos estrutura que expresse essa essência 
                  através dos cinco principais domínios empresariais.
                </p>
              </div>
            </div>

            {/* Os 5 Domínios */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {[
                { name: 'Branding', desc: 'Como você quer ser percebido' },
                { name: 'Marketing', desc: 'Como você atrai e seleciona' },
                { name: 'Vendas', desc: 'Como você avalia mutuamente' },
                { name: 'Entrega', desc: 'Como você transfere valor' },
                { name: 'Operações', desc: 'Como você organiza trabalho' }
              ].map((dominio, index) => (
                <div key={index} className="border-l-2 border-gray-600 pl-4">
                  <h5 className="text-sm font-medium text-white mb-2">{dominio.name}</h5>
                  <p className="text-xs text-gray-400">{dominio.desc}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-300 text-sm">
              Cada domínio se torna um amplificador da sua essência.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
