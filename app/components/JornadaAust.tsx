'use client';

import { useState, useEffect, useRef } from 'react';

export default function JornadaAust() {
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

  const niveis = [
    {
      nivel: "N1",
      titulo: "Operacional para Operacional Estratégico",
      situacao: "Você entrega valor, mas a empresa depende da sua presença para funcionar",
      desenvolvimento: "Você ainda separa quem você é do que a empresa faz. Sua identidade pessoal opera desconectada da empresarial.",
      resultado: "Faturamento estável entre 10k-50k mensais. Você consegue se afastar alguns dias sem a empresa parar.",
      color: "red"
    },
    {
      nivel: "N2", 
      titulo: "Estratégico para Criador Integral",
      situacao: "A empresa funciona além da sua presença física. Você criou sistemas que operam independentemente.",
      desenvolvimento: "Sua forma específica de resolver problemas começa a se manifestar através de outras pessoas.",
      resultado: "Faturamento entre 50k-200k mensais. Equipe toma decisões alinhadas sem consultá-lo constantemente.",
      color: "yellow"
    },
    {
      nivel: "N3",
      titulo: "Criador Integral Consolidado", 
      situacao: "Não existe separação entre quem você é e o que a empresa representa. A organização manifesta sua essência criativa.",
      desenvolvimento: "Você dissolve a dicotomia entre criar e trabalhar. A empresa vira extensão natural da sua forma de existir.",
      resultado: "Faturamento acima de 200k mensais. Irreplicabilidade competitiva. Clientes escolhem você pela visão de mundo.",
      color: "green"
    }
  ];


  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            Como sua empresa evolui
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            A jornada AUST
          </p>
          <p className="text-gray-400 mt-4 leading-relaxed">
            A evolução empresarial acontece quando você desenvolve essência e estrutura simultaneamente. 
            Cada estágio exige capacidades específicas nos cinco domínios.
          </p>
        </div>

        <div className="space-y-20">
          {niveis.map((nivel, index) => {
            return (
              <div 
                key={index}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 200}ms` }}
              >
                <div className="border-l border-gray-700 pl-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 border border-gray-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{nivel.nivel}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-white">
                      {nivel.titulo}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-2">Situação atual</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {nivel.situacao}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-2">Desenvolvimento da essência</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {nivel.desenvolvimento}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-2">Resultado prático</h4>
                      <p className="text-white text-sm leading-relaxed">
                        {nivel.resultado}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Neurociência */}
        <div className={`mt-32 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-l border-gray-700 pl-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">
              Empreender nesse nível vai te tornar uma pessoa melhor
            </h3>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                A neurociência mostra que durante estados de flow criativo, três redes cerebrais se ativam simultaneamente. 
                Isso raramente acontece na população geral.
              </p>
              
              <div className="space-y-6 my-8">
                <div className="border-l-2 border-gray-600 pl-6">
                  <h4 className="text-base font-medium mb-2 text-gray-200">Rede de Modo Padrão</h4>
                  <p className="text-sm text-gray-400">Responsável por insights e conexões não lineares</p>
                </div>
                <div className="border-l-2 border-gray-600 pl-6">
                  <h4 className="text-base font-medium mb-2 text-gray-200">Rede Executiva Central</h4>
                  <p className="text-sm text-gray-400">Mantém foco direcionado</p>
                </div>
                <div className="border-l-2 border-gray-600 pl-6">
                  <h4 className="text-base font-medium mb-2 text-gray-200">Rede de Saliência</h4>
                  <p className="text-sm text-gray-400">Decide o que merece atenção</p>
                </div>
              </div>
              
              <p className="text-white">
                Quando essas três redes operam em conjunto, a experiência subjetiva muda completamente. 
                Você para de sentir separação entre quem você é e o que está criando. O tempo se dilata. 
                Decisões surgem sem esforço consciente. É como se o trabalho se fizesse sozinho, através de você, não por você.
              </p>
              
              <p>
                A AUST trabalha especificamente com empreendedores que escolheram desenvolver configuração criativa. 
                Nossa metodologia é desenhada para facilitar transição neural necessária, com um modelo baseado em 
                princípios e desenvolvimento de ideias em conjunto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
