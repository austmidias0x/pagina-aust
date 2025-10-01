// Serviço de tracking do Meta Pixel (Facebook Pixel)

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export interface MetaPixelEventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Tracked event para aplicações/inscrições
 */
export function trackApplication(data?: MetaPixelEventData): void {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('📊 [META-PIXEL] Tracking Application:', data);
      window.fbq('track', 'Lead', data);
    } else {
      console.warn('⚠️ [META-PIXEL] Facebook Pixel não está carregado');
    }
  } catch (error) {
    console.error('❌ [META-PIXEL] Erro ao enviar evento:', error);
  }
}

/**
 * Track evento customizado do Meta Pixel
 */
export function trackMetaPixelEvent(eventName: string, data?: MetaPixelEventData): void {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log(`📊 [META-PIXEL] Tracking ${eventName}:`, data);
      window.fbq('track', eventName, data);
    } else {
      console.warn('⚠️ [META-PIXEL] Facebook Pixel não está carregado');
    }
  } catch (error) {
    console.error('❌ [META-PIXEL] Erro ao enviar evento:', error);
  }
}

/**
 * Track PageView
 */
export function trackPageView(): void {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('📊 [META-PIXEL] Tracking PageView');
      window.fbq('track', 'PageView');
    }
  } catch (error) {
    console.error('❌ [META-PIXEL] Erro ao enviar PageView:', error);
  }
}

