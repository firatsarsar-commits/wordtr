'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  FileText, 
  Bot, 
  User, 
  Loader2, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiAssistantWidgetProps {
  currentWeek?: number;
  currentTopic?: string;
}

let messageCounter = 0;
function createMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

function getFormattedTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

export function AiAssistantWidget({ currentWeek = 1, currentTopic = "Microsoft Word" }: AiAssistantWidgetProps) {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: t('assistantGreeting'),
      timestamp: getFormattedTime(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = language === 'tr' ? [
    'Otomatik içindekiler tablosu nasıl eklenir?',
    'Sayfa numarası 3. sayfadan nasıl başlatılır?',
    'Metin iki yana nasıl yaslanır (Justify)?',
    'Tabloda hücre birleştirme nerede bulunur?',
  ] : [
    'How do I insert an automatic Table of Contents?',
    'How to start page numbers on page 3?',
    'How do I justify text in Word?',
    'Where is Merge Cells in tables located?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: createMessageId('user'),
      sender: 'user',
      text,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          currentWeek,
          currentTopic,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Yapay zeka asistanına ulaşılamadı.');
      }

      const assistantMsg: Message = {
        id: createMessageId('assistant'),
        sender: 'assistant',
        text: data.text,
        timestamp: getFormattedTime(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorObj = err as Error;
      const errorMsg: Message = {
        id: createMessageId('error'),
        sender: 'assistant',
        text: errorObj.message || (language === 'tr' 
          ? 'Sunucuyla iletişim kurulurken bir sorun oluştu. Lütfen Gemini API anahtarınızı kontrol edin.' 
          : 'Could not connect to Gemini API. Please verify server settings.'),
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Toggle Button (when collapsed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer font-semibold text-xs border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          aria-label="WordLab AI Asistanını Aç"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t('assistantName')}</span>
        </button>
      )}

      {/* Expanded Chat Widget Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[90vw] sm:w-[400px] h-[550px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-blue-700 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-amber-300 shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight leading-none">
                  {t('assistantName')}
                </h3>
                <span className="text-2xs text-blue-200 font-medium">
                  {t('assistantRole')} · {language === 'tr' ? `${currentWeek}. Hafta` : `W${currentWeek}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-blue-200 hover:text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
                title={t('btnClose')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Notice Banner */}
          <div className="px-4 py-1.5 bg-blue-50 border-b border-blue-100 text-2xs text-blue-900 flex items-center justify-between">
            <span>{t('assistantContextNotice')} <strong>Hafta {currentWeek}: {currentTopic}</strong></span>
            <span className="text-blue-600 font-semibold">Gemini 3.8</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isUser ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-200 shadow-2xs'
                  }`}>
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-blue-700 text-white rounded-tr-xs shadow-2xs'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200 shadow-2xs'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-3xs mt-1 ${isUser ? 'text-blue-200 text-right' : 'text-slate-400 text-left'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-white text-slate-500 rounded-2xl rounded-tl-xs border border-slate-200 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-blue-700 animate-spin" />
                  <span className="text-2xs">{language === 'tr' ? 'Yanıt hazırlanıyor...' : 'Formulating response...'}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(qp)}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-full text-2xs text-slate-600 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistantInputPlaceholder')}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                title={t('btnSubmit')}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
