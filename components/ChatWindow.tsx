
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '../types';
import { Send, Phone, MoreVertical, Search, CheckCheck, Zap, MessageSquare, ChevronLeft, QrCode, Loader2, Smartphone, ShieldCheck } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { MOCK_RESTAURANT_INFO } from '../constants';

interface ChatWindowProps {
  conversations: Conversation[];
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  conversations: initialConversations, 
  isConnected, 
  onConnect,
  onDisconnect 
}) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(initialConversations[0]?.id || null);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPairing, setIsPairing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedConversation?.messages, isTyping, showDetailOnMobile, isConnected]);

  const handleStartPairing = () => {
    setIsPairing(true);
    setTimeout(() => {
      setIsPairing(false);
      onConnect();
    }, 4000);
  };

  const handleSelectChat = (id: string) => {
    setSelectedId(id);
    setShowDetailOnMobile(true);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'HUMAN',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    const updatedConversations = conversations.map(c => 
      c.id === selectedId ? { ...c, messages: [...c.messages, userMsg], lastMessage: userMsg.text } : c
    );
    
    setConversations(updatedConversations);
    setNewMessage('');
  };

  const simulateIncomingMessage = async () => {
    const text = "Hola, ¿tenéis opciones sin gluten?";
    const customerMsg: Message = {
      id: 'cust-' + Date.now(),
      sender: 'CUSTOMER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setConversations(prev => prev.map(c => 
      c.id === selectedId ? { ...c, messages: [...c.messages, customerMsg], lastMessage: text } : c
    ));

    setIsTyping(true);
    const aiResponse = await geminiService.generateResponse(text, MOCK_RESTAURANT_INFO);
    
    setTimeout(() => {
      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: aiResponse.found ? 'AI' : 'HUMAN',
        text: aiResponse.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      
      setConversations(prev => prev.map(c => 
        c.id === selectedId ? { ...c, messages: [...c.messages, aiMsg], lastMessage: aiMsg.text } : c
      ));
      setIsTyping(false);
    }, 1500);
  };

  if (!isConnected) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
          {!isPairing ? (
            <>
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100/50">
                <QrCode size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Vincular WhatsApp</h2>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                Para que la IA pueda responder tus mensajes, primero debes conectar tu cuenta de WhatsApp Business.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-left">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm font-black">1</div>
                  <p className="text-xs font-bold text-slate-700">Abre WhatsApp en tu teléfono</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-left">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm font-black">2</div>
                  <p className="text-xs font-bold text-slate-700">Toca Dispositivos vinculados {'>'} Vincular</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-left">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm font-black">3</div>
                  <p className="text-xs font-bold text-slate-700">Apunta con la cámara al código QR</p>
                </div>
              </div>

              <button 
                onClick={handleStartPairing}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Generar Código QR <Smartphone size={18} />
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="relative p-6 bg-white border-2 border-slate-100 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden aspect-square max-w-[280px] mx-auto">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=RespondeYaRest_Pairing_Flow" 
                  alt="QR Code" 
                  className="opacity-10 blur-[2px]" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/60">
                  <Loader2 size={48} className="text-emerald-500 animate-spin" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sincronizando...</p>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-800 animate-pulse">Generando conexión segura con WhatsApp...</p>
            </div>
          )}
          
          <div className="mt-12 flex items-center justify-center gap-4 text-[10px] text-slate-300 font-black uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck size={12} /> Cifrado de extremo a extremo</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-1/3 lg:w-80 border-r flex flex-col ${showDetailOnMobile ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b bg-white z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Conversaciones</h2>
            <button 
              onClick={onDisconnect}
              className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
            >
              Desconectar
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(chat => (
            <button
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b last:border-0 ${
                selectedId === chat.id ? 'bg-emerald-50' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-slate-600">
                {chat.customerName[0]}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm text-slate-900 truncate">{chat.customerName}</h4>
                  <span className="text-[10px] text-slate-400">{chat.lastTimestamp}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
                {chat.status === 'PENDING' && (
                  <span className="mt-2 inline-block px-2 py-0.5 bg-amber-100 text-amber-600 rounded text-[10px] font-bold uppercase tracking-wider">
                    Pendiente
                  </span>
                )}
              </div>
            </button>
          ))}
          <div className="p-4">
            <button 
              onClick={simulateIncomingMessage}
              className="w-full py-3 text-xs font-bold text-emerald-600 border border-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={14} /> Simular Mensaje Cliente
            </button>
          </div>
        </div>
      </div>

      {/* Detail - Chat Window */}
      <div className={`flex-1 flex flex-col bg-slate-50/30 ${!showDetailOnMobile ? 'hidden md:flex' : 'flex'}`}>
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowDetailOnMobile(false)}
                  className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">
                  {selectedConversation.customerName[0]}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 leading-tight truncate">{selectedConversation.customerName}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className="text-[11px] text-emerald-500 font-bold">{selectedConversation.customerPhone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="cursor-pointer hover:text-slate-600 hidden sm:block" />
                <MoreVertical size={18} className="cursor-pointer hover:text-slate-600" />
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {selectedConversation.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'CUSTOMER' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm relative ${
                    msg.sender === 'CUSTOMER' 
                      ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' 
                      : msg.sender === 'AI' 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-white rounded-tr-none'
                  }`}>
                    {msg.sender === 'AI' && (
                      <span className="absolute -top-5 right-0 text-[9px] text-emerald-600 font-bold uppercase flex items-center gap-1 bg-white/80 px-1 rounded">
                        <Zap size={10} /> Respuesta AI
                      </span>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'CUSTOMER' ? 'text-slate-400' : 'text-white/70'}`}>
                      <span className="text-[10px]">{msg.timestamp}</span>
                      {msg.sender !== 'CUSTOMER' && <CheckCheck size={14} />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 border border-slate-100">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-1.5">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Respuesta manual de humano..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                    newMessage.trim() ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-white">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={32} className="text-slate-200" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Selecciona un chat</h3>
            <p className="max-w-xs text-sm">WhatsApp conectado correctamente. La IA está gestionando los mensajes entrantes en tiempo real.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
