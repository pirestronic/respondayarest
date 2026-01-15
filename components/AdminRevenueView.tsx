
import React, { useState } from 'react';
import { CreditCard, Wallet, Landmark, TrendingUp, Save, ShieldCheck } from 'lucide-react';

const AdminRevenueView: React.FC = () => {
  const [bankData, setBankData] = useState({
    holder: 'RESPONDEYAREST SOLUTIONS S.L.',
    iban: 'ES89 1234 5678 9012 3456 7890',
    swift: 'RYR ES MM XXX'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Control de Ingresos</h2>
          <p className="text-slate-500">Configura dónde recibes los pagos de tus clientes.</p>
        </div>
        <button 
          onClick={() => alert('Datos bancarios guardados')}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg"
        >
          <Save size={18} /> Guardar Configuración
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Landmark className="text-emerald-500" size={20} /> Cuenta Receptora (Cobros)
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titular de la Cuenta</label>
                <input 
                  type="text" 
                  value={bankData.holder}
                  onChange={e => setBankData({...bankData, holder: e.target.value})}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Número de Cuenta (IBAN)</label>
                <input 
                  type="text" 
                  value={bankData.iban}
                  onChange={e => setBankData({...bankData, iban: e.target.value})}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm font-mono focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">SWIFT / BIC</label>
                <input 
                  type="text" 
                  value={bankData.swift}
                  onChange={e => setBankData({...bankData, swift: e.target.value})}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm font-mono focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
              <ShieldCheck className="text-emerald-600 mt-1" size={16} />
              <p className="text-[11px] text-emerald-800 leading-tight">
                Los pagos de suscripción se transfieren automáticamente a esta cuenta cada 15 de mes tras descontar comisiones de pasarela.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2 text-emerald-400">
                 <TrendingUp size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Saldo Proyectado</span>
               </div>
               <h3 className="text-4xl font-black mb-1">2.480,00 €</h3>
               <p className="text-slate-400 text-sm mb-6">Acumulado este mes</p>
               
               <div className="space-y-4 pt-6 border-t border-white/10">
                 <div className="flex justify-between items-center">
                   <span className="text-xs text-slate-400">Próximo Pago</span>
                   <span className="text-xs font-bold">15 Mar 2024</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400">Suscripciones Activas</span>
                   <span className="font-bold">124</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default AdminRevenueView;
