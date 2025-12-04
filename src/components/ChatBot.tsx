import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chatService';
import type { Message } from '../types/chat';

export default function ChatBot() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionKey] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mensaje de bienvenida al cargar
  useEffect(() => {
    const welcomeMessage = user
      ? '¡Hola! Soy tu asistente virtual. Puedo ayudarte a buscar productos, consultar disponibilidad y transferencias entre sucursales.'
      : '¡Hola! Soy tu asistente virtual. Para transferencias entre sucursales necesitas iniciar sesión.';
    addBotMessage(welcomeMessage);
  }, [user]);

  // Función para agregar mensaje del bot
  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  // Función para enviar mensaje del usuario al webhook de n8n
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setLoading(true);

    try {
      const botMessage = await chatService.sendMessage(sessionKey, messageToSend);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error comunicándose con n8n:', error);
      addBotMessage('Lo siento, hubo un error procesando tu mensaje. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Asistente Virtual</h2>
                <p className="text-blue-100 text-sm">
                  {user ? 'Usuario autenticado - Historial privado' : 'Modo invitado'}
                </p>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-lg whitespace-pre-wrap ${
                    msg.sender === 'bot' ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
