
import React, { useState } from 'react';
// Added missing FileText icon to the lucide-react imports
import { CreditCard, Download, ShieldCheck, Calendar, Lock, Zap, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const BillingView: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const invoices = [
    { id: 'INV-2024-001', date: '01 Mar 2024', amount: '20,00 €', status: 'Pagado' },
    { id: 'INV-2024-002', date: '01 Feb 2024', amount: '20,00 €', status: 'Pagado' },
    { id: 'INV-2024-003', date: '01 Ene 2024', amount: '20,00 €', status: 'Pagado' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Suscripción y Pagos</h2>
        <p className="text-slate-500 text-sm font-medium">Gestiona tu plan PRO de RespondeYaRest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Plan Status Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden transition-all ${isSubscribed ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'}`}>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                {isSubscribed ? 'Suscripción Activa' : 'Prueba Gratuita'}
              </div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black">20€</span>
                <span className="text-white/60 text-sm font-bold">/ mes</span>
              </div>

              <ul className="space-y-4 mb-10">
                {['Respuestas AI Ilimitadas', 'Gestión PDF Avanzada', 'Soporte 24/7'].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-xs font-bold text-white/80">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" /> {feat}
                  </li>
                ))}
              </ul>

              {!isSubscribed ? (
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black shadow-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> Activar PRO <ArrowRight size={18} />
                </button>
              ) : (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1.5">Próximo cobro</p>
                  <p className="text-sm font-bold">01 Abril, 2024</p>
                </div>
              )}
            </div>
          </div>
          
          {isSubscribed && (
            <button className="w-full text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
              Solicitar baja de suscripción
            </button>
          )}
        </div>

        {/* History and Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tarjetas en Móvil (reemplaza tabla ancha) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900">Historial de Facturas</h3>
              <div className="p-2 bg-slate-50 rounded-xl"><Calendar size={20} className="text-slate-400" /></div>
            </div>

            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-slate-50 rounded-3xl gap-4 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black text-slate-900">{inv.id}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{inv.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                    <span className="text-lg font-black text-slate-900">{inv.amount}</span>
                    <button className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm hover:bg-emerald-600 hover:text-white transition-all">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-widest pt-6 border-t border-slate-50">
              <span className="flex items-center gap-2"><Lock size={12} /> SSL Secure</span>
              <span className="flex items-center gap-2"><CreditCard size={12} /> PCI Compliant</span>
              <span className="flex items-center gap-2"><ShieldCheck size={12} /> Stripe Partner</span>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => setIsSubscribed(true)} 
      />
    </div>
  );
};

export default BillingView;
