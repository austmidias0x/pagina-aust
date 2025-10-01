import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, Loader2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { ApiService } from "../../lib/api-service";
import { trackApplication, trackMetaPixelEvent } from "../../lib/meta-pixel";

// Schema de validação
const subscriptionSchema = z.object({
  // Etapa 1 - O que a empresa faz (opcional)
  companyDescription: z.string().optional(),
  
  // Etapa 2 - O que impede o crescimento (opcional)
  growthBlocker: z.string().optional(),
  
  // Etapa 3 - Infos do negócio
  instagram: z.string().min(1, "Instagram é obrigatório"),
  revenue: z.enum(["<10k", "10k-50k", "50k-100k", "100k-500k", "500k+"], {
    message: "Selecione uma faixa de faturamento"
  }),
  
  // Etapa 4 - Contato
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}\-?\d{4}$/, "Número de WhatsApp inválido (use DDD)"),
});

type SubscriptionData = z.infer<typeof subscriptionSchema>;

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const revenueOptions = [
  { value: "<10k", label: "Menos de 10k mensal", description: "Início de operação" },
  { value: "10k-50k", label: "R$ 10k - 50k", description: "Validando modelo" },
  { value: "50k-100k", label: "R$ 50k - 100k", description: "Crescimento inicial" },
  { value: "100k-500k", label: "R$ 100k - 500k", description: "Operação estabelecida" },
  { value: "500k+", label: "Mais de R$ 500k", description: "Alta performance" },
];

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const [showMinTextWarning, setShowMinTextWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  const form = useForm<SubscriptionData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      companyDescription: "",
      growthBlocker: "",
      instagram: "",
      revenue: undefined,
      name: "",
      email: "",
      phone: "",
    },
  });

  // Total de etapas (0 = intro, 1-4 = formulário)
  const totalSteps = 4;
  const progress = currentStep === 0 ? 0 : (currentStep / totalSteps) * 100;

  // Detectar Safari e gerenciar teclado virtual
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    setIsSafari(isSafariBrowser);

    if (!open) return;

    const handleViewportChange = () => {
      if (window.visualViewport) {
        const height = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(height > 100 ? height : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      setKeyboardHeight(0);
    };
  }, [open]);

  const onSubmit = async (data: SubscriptionData) => {
    console.log('🎯 [MODAL] Iniciando processo de envio...');
    console.log('📝 [MODAL] Dados do formulário:', data);
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('🔄 [MODAL] Mapeando dados...');
      const leadData = ApiService.mapFormDataToLead(data as any);
      
      console.log('📡 [MODAL] Enviando para APIs...');
      const result = await ApiService.submitLead(leadData, data as any);
      
      console.log('📨 [MODAL] Resultado das APIs:', result);
      
      if (result.success) {
        console.log("✅ [MODAL] Lead enviado com sucesso:", result.data);
        
        trackApplication({ content_name: "Formulário de Diagnóstico Empresarial" });
        trackMetaPixelEvent('CompleteRegistration', {
          content_name: 'Candidatura AUST',
          status: 'completed'
        });
        
        setIsSuccess(true);
        
        setTimeout(() => {
          console.log('🔄 [MODAL] Fechando modal e resetando...');
          setIsSuccess(false);
          onOpenChange(false);
          form.reset();
          setError(null);
          setCurrentStep(0);
        }, 3000);
      } else {
        console.error("❌ [MODAL] Erro da API:", result.error);
        setError(result.error || "Erro inesperado. Tente novamente.");
      }
    } catch (error) {
      console.error("💥 [MODAL] Erro não capturado:", error);
      setError("Erro inesperado. Verifique sua conexão e tente novamente.");
    } finally {
      console.log('🏁 [MODAL] Finalizando processo...');
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      onOpenChange(newOpen);
      if (!newOpen) {
        form.reset();
        setIsSuccess(false);
        setCurrentStep(0);
        setShowSkipWarning(false);
        setShowMinTextWarning(false);
        setError(null);
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      // Última etapa - validar e enviar
      form.handleSubmit(onSubmit)();
    } else if (currentStep === 3) {
      // Validar etapa 3 (Instagram e Revenue)
      const instagramValid = form.getValues('instagram').length > 0;
      const revenueValid = form.getValues('revenue') !== undefined;
      
      if (!instagramValid || !revenueValid) {
        form.trigger(['instagram', 'revenue']);
        return;
      }
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(prev => prev + 1);
    }
    setShowSkipWarning(false);
  };

  // Verificar se pode avançar nas etapas opcionais
  const canContinue = () => {
    if (currentStep === 1) {
      const description = form.watch('companyDescription') || '';
      return description.trim().length >= 20; // Mínimo de 20 caracteres
    }
    if (currentStep === 2) {
      const blocker = form.watch('growthBlocker') || '';
      return blocker.trim().length >= 20; // Mínimo de 20 caracteres
    }
    return true; // Outras etapas sempre podem continuar
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setShowSkipWarning(false);
    setShowMinTextWarning(false);
  };

  const handleTryNext = () => {
    if (canSkip && !canContinue()) {
      // Mostrar aviso de texto mínimo
      setShowMinTextWarning(true);
      setTimeout(() => setShowMinTextWarning(false), 3000);
    } else {
      handleNext();
    }
  };

  const handleSkip = () => {
    if (!showSkipWarning) {
      // Primeira vez - mostrar aviso
      setShowSkipWarning(true);
    } else {
      // Segunda vez - realmente pular
      setCurrentStep(prev => prev + 1);
      setShowSkipWarning(false);
    }
  };

  const canSkip = currentStep === 1 || currentStep === 2;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="bg-dark-card border-dark-border text-white w-full max-w-[calc(100vw-1rem)] max-h-[95vh] overflow-y-auto sm:max-w-lg p-0"
        style={{
          ...(keyboardHeight > 0 && isSafari && {
            maxHeight: 'calc(100vh - 2rem)',
            marginTop: '1rem'
          })
        }}
      >
        {/* Barra de Progresso */}
        {currentStep > 0 && !isSuccess && (
          <div className="w-full h-1 bg-gray-800">
            <div 
              className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-4 sm:p-6">
          {/* Tela de Sucesso */}
          {isSuccess ? (
            <>
              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-xl font-bold">
                  🎉 Candidatura Enviada!
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-sm">
                  Em breve você receberá um contato nosso!
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </>
          ) : currentStep === 0 ? (
            /* Etapa 0 - Introdução */
            <>
              <DialogHeader className="text-center space-y-4 mb-6">
                <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
                  Apresente sua operação, conte sua trajetória e receba um diagnóstico completo
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <p className="text-gray-300 leading-relaxed text-base">
                  Aplique para uma reunião com os sócios da AUST. Analisamos seus domínios, 
                  identificamos o que está travando sua escala e revelamos como liberar o 
                  potencial do seu negócio.
                </p>

                <p className="text-gray-400 leading-relaxed text-sm">
                  Para empresários que já faturam mas sentem que falta algo para crescer de verdade. 
                  Verificamos a compatibilidade entre seu momento e nossa forma de trabalhar, havendo 
                  alinhamento, você apresenta sua operação e recebe um plano completo para o próximo patamar.
                </p>

                <div className="pt-6">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-gradient-to-r from-white to-gray-100 text-black font-bold h-12 text-base hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="mr-2">→</span>
                    Apresentar Minha Operação
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Formulário Multi-etapas */
            <>
              <Form {...form}>
                <div className="space-y-6">
                  
                  {/* Etapa 1 - O que sua empresa faz */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <DialogHeader className="text-center space-y-2">
                        <DialogTitle className="text-xl md:text-2xl font-bold">
                          Conte brevemente: o que sua empresa faz e para quem?
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                          Isso nos ajuda a entender melhor seu negócio
                        </DialogDescription>
                      </DialogHeader>

                      <FormField
                        control={form.control}
                        name="companyDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Consultoria estratégica para empresas B2B que faturam entre 100k-500k/mês e querem estruturar seus processos comerciais..."
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 min-h-[150px] text-base resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showSkipWarning && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start space-x-3 animate-in fade-in duration-300">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-yellow-200 text-sm font-medium">
                              Atenção: Pular esta etapa pode reduzir suas chances
                            </p>
                            <p className="text-yellow-300 text-xs mt-1">
                              Quanto mais informações você fornecer, melhor conseguiremos avaliar a compatibilidade.
                            </p>
                          </div>
                        </div>
                      )}

                      {showMinTextWarning && (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3 animate-in fade-in duration-300">
                          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-blue-200 text-sm font-medium">
                              Conte-nos um pouquinho mais para continuar
                            </p>
                            <p className="text-blue-300 text-xs mt-1">
                              Escreva pelo menos algumas palavras ou use "Pular etapa" se preferir não responder.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Etapa 2 - O que impede o crescimento */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <DialogHeader className="text-center space-y-2">
                        <DialogTitle className="text-xl md:text-2xl font-bold">
                          O que você sente que está impedindo sua empresa de alcançar o próximo patamar?
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                          Seja sincero, isso é crucial para nosso diagnóstico
                        </DialogDescription>
                      </DialogHeader>

                      <FormField
                        control={form.control}
                        name="growthBlocker"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Sinto que falta estrutura na operação, dependemos muito de mim para fechar negócios, não temos processos claros..."
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 min-h-[150px] text-base resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showSkipWarning && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start space-x-3 animate-in fade-in duration-300">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-yellow-200 text-sm font-medium">
                              Atenção: Pular esta etapa pode reduzir suas chances
                            </p>
                            <p className="text-yellow-300 text-xs mt-1">
                              Entender seu bloqueio atual é essencial para identificarmos se podemos ajudar.
                            </p>
                          </div>
                        </div>
                      )}

                      {showMinTextWarning && (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3 animate-in fade-in duration-300">
                          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-blue-200 text-sm font-medium">
                              Conte-nos um pouquinho mais para continuar
                            </p>
                            <p className="text-blue-300 text-xs mt-1">
                              Escreva pelo menos algumas palavras ou use "Pular etapa" se preferir não responder.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Etapa 3 - Infos do negócio */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <DialogHeader className="text-center space-y-2">
                        <DialogTitle className="text-xl md:text-2xl font-bold">
                          Informações do negócio
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                          Dados essenciais para análise
                        </DialogDescription>
                      </DialogHeader>

                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              @ do Instagram da empresa
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="@suaempresa"
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 h-11 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="revenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              Faixa de faturamento mensal
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-dark-bg border-dark-border text-white h-11 text-base w-full">
                                  <SelectValue placeholder="Selecione a faixa..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-dark-card border-dark-border w-full">
                                {revenueOptions.map((option) => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="text-white hover:bg-gray-800 focus:bg-gray-800"
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">{option.label}</span>
                                      <span className="text-xs text-gray-400">{option.description}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Etapa 4 - Contato */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <DialogHeader className="text-center space-y-2">
                        <DialogTitle className="text-xl md:text-2xl font-bold">
                          Seus dados de contato
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                          Para entrarmos em contato com você
                        </DialogDescription>
                      </DialogHeader>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              Seu nome completo
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Digite seu nome"
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 h-11 text-base"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              Seu melhor email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="seu@email.com"
                                type="email"
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 h-11 text-base"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              WhatsApp (com DDD)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(11) 99999-9999"
                                type="tel"
                                className="bg-dark-bg border-dark-border text-white placeholder:text-gray-500 h-11 text-base"
                                autoComplete="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-200 text-sm font-medium">Erro ao enviar</p>
                            <p className="text-red-300 text-xs mt-1">{error}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Botões de Navegação */}
                  <div className="flex items-center justify-between gap-3 pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                    )}
                    
                    {canSkip && (
                      <Button
                        type="button"
                        onClick={handleSkip}
                        variant="ghost"
                        className={cn(
                          "text-gray-400 hover:text-gray-200 hover:bg-gray-800",
                          showSkipWarning && "text-yellow-400 hover:text-yellow-300"
                        )}
                      >
                        {showSkipWarning ? "Pular mesmo assim" : "Pular etapa"}
                      </Button>
                    )}

                    <Button
                      type="button"
                      onClick={handleTryNext}
                      disabled={isSubmitting}
                      className={cn(
                        "bg-gradient-to-r from-white to-gray-100 text-black font-bold h-11 px-6 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg",
                        (canSkip && !canContinue()) && "opacity-50",
                        currentStep === 1 && "ml-auto"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : currentStep === 4 ? (
                        <>
                          Enviar Candidatura
                          <Check className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  {currentStep === 4 && (
                    <p className="text-xs text-gray-500 text-center mt-3">
                      🔒 Seus dados estão seguros e não serão compartilhados
                    </p>
                  )}
                </div>
              </Form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
