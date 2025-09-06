'use client';

import { useState, useEffect, useRef } from 'react';

export default function EssenciaSection() {
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
            Essência
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Aqui, você entende o futuro do mercado e como a AUST te ajuda a se integrar
          </p>
        </div>

        <div className="space-y-20">
          {/* Mudança de Paradigmas */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border-l border-gray-700 pl-8">
              <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">
                Uma mudança de paradigmas está acontecendo no mundo do empreendedorismo
              </h3>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Observe os empreendedores que você admira. Aqueles que construíram algo que ninguém mais poderia ter construído. 
                  Eles operaram em um nível de consciência diferente da massa que copia funis e otimiza métricas.
                </p>
                
                <p>
                  Quando você estuda os grandes nomes, Leonardo da Vinci, Steve Jobs, Elon Musk, percebe que eles dissolveram 
                  a separação entre quem eram e o que criaram.
                </p>
                
                <p className="text-white">
                  É a compreensão de como funcionam os níveis mais altos de criação empresarial, o lado mais bonito do 
                  empreendedorismo, quando o processo vira arte.
                </p>
              </div>

              {/* Níveis de Consciência */}
              <div className="mt-12 space-y-8">
                <div className="border-l-2 border-gray-600 pl-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-200">Nível Moderno</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Buscam desenvolvimento pessoal, otimizam processos, seguem metodologias. 
                    Acumulam conhecimento técnico, mas continuam presos na separação artificial 
                    entre identidade pessoal e empresarial.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-500 pl-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-200">Nível Pós-Moderno</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Compreendem contextos múltiplos, entendem perspectivas diferentes, conseguem navegar complexidade. 
                    Mas ainda operam dentro da lógica de "eu tenho uma empresa" ao invés de "eu sou uma manifestação empresarial".
                  </p>
                </div>
                
                <div className="border-l-2 border-white pl-6">
                  <h4 className="text-lg font-medium mb-3 text-white">Pensamento Integral</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Não existe mais a dicotomia criador versus criação. A empresa se torna a forma através da qual 
                    sua essência se expressa no mundo. O trabalho vira criação. Criar vira viver.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Libido Empresarial */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border-l border-gray-700 pl-8">
              <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">
                O que significa libido empresarial
              </h3>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Freud identificou a libido como energia psíquica fundamental. Jung expandiu: é a força vital que impulsiona toda criação humana.
                </p>
                
                <p>
                  No contexto empresarial, sua libido é sua essência criativa buscando manifestação através de estrutura. 
                  Quando você dissolve a separação entre quem você é e o que constrói, essa energia encontra vazão.
                </p>
                
                <p className="text-white">
                  Você acorda pensando na empresa porque ela se tornou o veículo através do qual você existe no mundo. 
                  Não por ser um workaholic, na realidade você encontrou o alinhamento entre a sua energia vital e a sua manifestação externa.
                </p>
                
                <p>
                  É tipo se apaixonar, você não força pensamentos sobre a pessoa, eles surgem naturalmente porque houve dissolução de fronteiras. 
                  O mesmo acontece quando sua essência encontra expressão através da estrutura empresarial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
