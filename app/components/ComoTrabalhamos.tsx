'use client';

import { useState, useEffect, useRef } from 'react';

export default function ComoTrabalhamos() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const servicos = [
    {
      name: "Academy",
      icon: "🎓",
      subtitle: "Desenvolvemos sua forma de pensar",
      description: "Elevamos seu nível de consciência empresarial para operar como criador de soluções, não seguidor de metodologias prontas.",
      features: [
        "Diagnóstico completo da sua essência atual e estruturação dos cinco domínios",
        "Planejamento estratégico personalizado com acompanhamento semanal",
        "Aulas ao vivo focadas nas suas situações reais",
        "Grupo fechado com empresários no mesmo nível de desenvolvimento",
        "Suporte direto dos sócios da AUST para decisões estratégicas",
        "Acesso à biblioteca de processos validados em 500+ empresas",
        "Academy completa para estudo - uma faculdade do empreendedorismo",
        "Diagnóstico de pontos de alavancagem e gargalos"
      ],
      result: "Você tem clareza total sobre onde está, onde quer chegar e quais passos dar. Mapa claro da atuação estratégica no seu negócio.",
      color: "blue"
    },
    {
      name: "Agency", 
      icon: "🚀",
      subtitle: "Colocamos nossa equipe no seu negócio",
      description: "Nossa equipe operacional trabalha diretamente no seu negócio, implementando sua essência nos cinco domínios simultaneamente.",
      features: [
        "Equipe completa de marketing, vendas e operações dedicada",
        "Implementação coordenada dos cinco domínios",
        "Acompanhamento de métricas e otimização",
        "Treinamento da sua equipe interna",
        "Criação de sistemas personalizados",
        "Documentação de processos"
      ],
      result: "Tratamos seu negócio como se fosse nosso. Nossa equipe se integra às suas operações existentes implementando mudanças sem interrupções.",
      color: "purple"
    },
    {
      name: "Tech",
      icon: "⚡", 
      subtitle: "Criamos vantagem tecnológica para sua essência",
      description: "Desenvolvemos soluções simbióticas que amplificam especificamente o que só você consegue oferecer ao mercado.",
      features: [
        "Análise técnica dos seus processos atuais",
        "Desenvolvimento de sistemas personalizados",
        "Integração com ferramentas existentes sem rupturas",
        "Automações que preservam qualidade e toque pessoal",
        "Treinamento da equipe para novas tecnologias",
        "Manutenção e evolução contínua dos sistemas"
      ],
      result: "Automatizamos processos repetitivos para liberar seu tempo para criação estratégica. A tecnologia serve à essência, nunca o contrário.",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "from-blue-900/40 to-blue-800/20",
        border: "border-blue-500/30",
        text: "text-blue-300",
        button: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 text-blue-300"
      },
      purple: {
        bg: "from-purple-900/40 to-purple-800/20",
        border: "border-purple-500/30", 
        text: "text-purple-300",
        button: "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30 text-purple-300"
      },
      green: {
        bg: "from-green-900/40 to-green-800/20",
        border: "border-green-500/30",
        text: "text-green-300", 
        button: "bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-300"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            Como trabalhamos na prática
          </h2>
        </div>

        <div className="space-y-20">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <div className="border-l border-gray-700 pl-8">
                <h3 className="text-xl md:text-2xl font-medium mb-6 text-white">{servico.name}</h3>
                <p className="text-lg text-gray-300 mb-6">{servico.subtitle}</p>
                <p className="text-gray-400 leading-relaxed mb-8">{servico.description}</p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-base font-medium text-gray-200 mb-4">Como entregamos:</h4>
                    <ul className="space-y-3">
                      {servico.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-gray-400">
                          <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l-2 border-gray-600 pl-6">
                    <h4 className="text-base font-medium text-white mb-3">Na prática:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{servico.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compromisso */}
        <div className={`mt-32 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-l border-gray-700 pl-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-white">Nosso compromisso</h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Trabalhamos com desenvolvimento genuíno, não aplicação de metodologias prontas. 
                Se você seguir orientações e implementar mudanças sugeridas, resultados aparecem de forma mensurável.
              </p>
              <p>
                Nosso investimento no seu sucesso é real porque operamos com relacionamentos de longo prazo. 
                Seu crescimento sustentável é nossa métrica de sucesso.
              </p>
              <p>
                Identificamos rapidamente casos que não se alinham com nossa metodologia e direcionamos para soluções mais adequadas. 
                Transparência sobre compatibilidade evita frustrações e acelera resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
