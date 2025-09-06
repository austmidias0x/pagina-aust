'use client';

import { useState, useEffect, useRef } from 'react';

export default function NiveisAtuacao() {
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
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            Níveis de Atuação
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Academy, Agency, Tech
          </p>
        </div>

        <div className="space-y-16">
          {/* Academy */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border-l border-gray-700 pl-8">
              <h3 className="text-xl md:text-2xl font-medium mb-6 text-white">Academy</h3>
              <p className="text-lg text-gray-300 mb-6">Desenvolvemos seu nível de consciência empresarial.</p>
              <p className="text-gray-400 leading-relaxed">
                Você aprende a operar como criador, não como seguidor de metodologias. 
                Desenvolvemos pensamento integral, capacidade de conectar disciplinas aparentemente desconexas, 
                habilidade de colaborar mantendo identidade.
              </p>
            </div>
          </div>

          {/* Agency */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border-l border-gray-700 pl-8">
              <h3 className="text-xl md:text-2xl font-medium mb-6 text-white">Agency</h3>
              <p className="text-lg text-gray-300 mb-6">Nossa equipe implementa sua essência nos cinco domínios.</p>
              <p className="text-gray-400 leading-relaxed">
                Não delegamos sua visão para terceiros. Integramos nossa expertise técnica à sua criatividade específica.
              </p>
            </div>
          </div>

          {/* Tech */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border-l border-gray-700 pl-8">
              <h3 className="text-xl md:text-2xl font-medium mb-6 text-white">Tech</h3>
              <p className="text-lg text-gray-300 mb-6">Desenvolvemos soluções tecnológicas que amplificam o que só você pode oferecer.</p>
              <p className="text-gray-400 leading-relaxed">
                Cada automação, cada sistema é pensado para potencializar sua essência.
              </p>
            </div>
          </div>
        </div>

        {/* Quem atendemos */}
        <div className={`mt-32 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-l border-gray-700 pl-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">
              Quem atendemos?
            </h3>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Nosso cliente <span className="text-white font-medium">já fatura, já está com a empresa rodando</span>. 
                Construiu um negócio funcional, mas sente que perdeu algo no processo. Percebe que sua empresa 
                poderia ser muito mais do que é, mas não sabe como expressar sua visão através da estrutura.
              </p>
              
              <p>
                São pessoas que não conseguem mais separar sua identidade da empresarial porque compreenderam 
                que essa separação nunca fez sentido. Querem construir algo que só eles poderiam ter construído.
              </p>
              
              <p className="border-l-2 border-gray-600 pl-6 text-gray-400">
                <span className="text-white font-medium">Não atendemos</span> quem busca fórmulas prontas ou atalhos, pois o caminho não será fácil. 
                Expressar a si mesmo exige um processo rigoroso de autoconhecimento, bem como expansão de si mesmo 
                e personalização disso para a escala.
              </p>
              
              <p className="text-white font-medium">
                Se você compreende que sua empresa deveria ser extensão da sua essência criativa, podemos conversar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
