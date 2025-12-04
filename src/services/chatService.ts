import { Message } from '../types/chat';

const N8N_WEBHOOK_URL = 'https://herlanhs.app.n8n.cloud/webhook/chatbot';

export const chatService = {
  async sendMessage(sessionKey: string, content: string): Promise<Message> {
    if (!N8N_WEBHOOK_URL) throw new Error("No se definió la URL del webhook");

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatInput: content,
        sessionId: sessionKey
      }),
    });

    const data = await response.json();

    const botContent = data.hasOwnProperty('output') ? data.output : "No se recibió respuesta del bot.";

    return {
      id: crypto.randomUUID(),
      content: botContent,
      sender: 'bot',
      timestamp: new Date(),
    };
  },
};
