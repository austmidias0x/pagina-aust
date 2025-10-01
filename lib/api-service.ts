// Serviço de API para gerenciar leads
export interface LeadData {
  companyDescription?: string;
  growthBlocker?: string;
  instagram: string;
  revenue: string;
  name: string;
  email: string;
  phone: string;
}

export interface WebhookPayload {
  name: string;
  whatsapp: string;
  email: string;
  form_data: {
    company_description?: string;
    growth_blocker?: string;
    instagram: string;
    revenue: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiService {
  private static WEBHOOK_URL = 'https://app.bottura.xyz/aust/leads';

  /**
   * Mapeia dados do formulário para o formato do webhook
   */
  static mapFormDataToLead(formData: LeadData): LeadData {
    return formData;
  }

  /**
   * Converte dados do formulário para o formato do webhook
   */
  static formatWebhookPayload(formData: LeadData): WebhookPayload {
    return {
      name: formData.name,
      whatsapp: formData.phone,
      email: formData.email,
      form_data: {
        company_description: formData.companyDescription,
        growth_blocker: formData.growthBlocker,
        instagram: formData.instagram,
        revenue: formData.revenue,
      }
    };
  }

  /**
   * Envia lead para o webhook
   */
  static async submitLead(leadData: LeadData, originalData: LeadData): Promise<ApiResponse> {
    try {
      console.log('📡 [API-SERVICE] Preparando dados para envio...');
      console.log('📝 [API-SERVICE] Dados originais:', leadData);
      
      // Formatar payload para o webhook
      const payload = this.formatWebhookPayload(leadData);
      console.log('📦 [API-SERVICE] Payload formatado:', payload);
      
      console.log(`🌐 [API-SERVICE] Enviando para ${this.WEBHOOK_URL}...`);
      
      const response = await fetch(this.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📊 [API-SERVICE] Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [API-SERVICE] Erro na resposta:', errorText);
        throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('✅ [API-SERVICE] Resposta do servidor:', responseData);
      
      return {
        success: true,
        data: responseData,
      };
      
    } catch (error) {
      console.error('💥 [API-SERVICE] Erro ao enviar lead:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao enviar dados. Verifique sua conexão.',
      };
    }
  }
}

