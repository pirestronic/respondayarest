
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MessageSquare, Zap, Clock, TrendingUp, Smartphone, Download } from 'lucide-react';

const data = [
  { name: 'Lun', auto: 12, manual: 4 },
  { name: 'Mar', auto: 19, manual: 2 },
  { name: 'Mie', auto: 15, manual: 8 },
  { name: 'Jue', auto: 22, manual: 3 },
  { name: 'Vie', auto: 30, manual: 12 },
  { name: 'Sab', auto: 45, manual: 15 },
  { name: 'Dom', auto: 38, manual: 10 },
];

const StatCard = ({ title, value, icon: Icon, color, subValue }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
        <TrendingUp size={12} /> +12%
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
  </div>
);

const Dashboard: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Hola de nuevo, Paco 👋</h2>
          <p className="text-slate-500">Aquí tienes un resumen de lo que ha pasado en tu WhatsApp esta semana.</p>
        </div>
        
        {deferredPrompt && (
          <button 
            onClick={handleInstallClick}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold animate-bounce shadow-lg"
          >
            <Smartphone size={18} className="text-emerald-400" /> Instalar App
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Msg. Automáticos" value="181" icon={Zap} color="bg-amber-500" subValue="Respuestas por AI" />
        <StatCard title="Msg. Manuales" value="54" icon={MessageSquare} color="bg-emerald-500" subValue="Intervención humana" />
        <StatCard title="Tiempo Ahorrado" value="15.2 h" icon={Clock} color="bg-indigo-500" subValue="Estimación basada en msg." />
        <StatCard title="Dinero Ahorrado" value="304 €" icon={TrendingUp} color="bg-emerald-600" subValue="Coste de tiempo operativo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Volumen de mensajes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="auto" fill="#10b981" radius={[4, 4, 0, 0]} name="Automático" />
                <Bar dataKey="manual" fill="#64748b" radius={[4, 4, 0, 0]} name="Manual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-emerald-600 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Download size={120} />
           </div>
           <div className="relative z-10">
             <h3 className="text-xl font-black mb-2">Lleva tu negocio en el bolsillo</h3>
             <p className="text-emerald-100 text-sm leading-relaxed mb-6">Instala RespondeYaRest en tu móvil para recibir notificaciones en tiempo real y responder a tus clientes desde cualquier lugar.</p>
           </div>
           <div className="relative z-10 p-4 bg-white/10 rounded-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Smartphone size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Paso a paso</span>
              </div>
              <p className="text-[10px] text-emerald-50 leading-normal">
                iOS: Pulsa <span className="font-bold">Compartir</span> y luego <span className="font-bold">"Añadir a pantalla de inicio"</span>.<br/>
                Android: Pulsa el botón superior <span className="font-bold">"Instalar App"</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
