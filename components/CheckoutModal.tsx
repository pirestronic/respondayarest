
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {step === 'form' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Suscripción PRO</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Plan Mensual</span>
                <span className="text-2xl font-black text-emerald-600">20€<span className="text-xs text-emerald-400">/mes</span></span>
              </div>
              <p className="text-xs text-emerald-700 font-medium">Incluye mensajes ilimitados, IA avanzada y soporte prioritario.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Titular de la tarjeta</label>
                <input type="text" placeholder="Nombre completo" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Detalles de pago</label>
                <div className="relative">
                  <input type="text" placeholder="4242 4242 4242 4242" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Expiración</label>
                  <input type="text" placeholder="MM / YY" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 text-center" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">CVC</label>
                  <input type="text" placeholder="123" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 text-center" />
                </div>
              </div>
            </div>

            <button 
              onClick={handlePay}
              className="w-full mt-8 py-4 bg-slate-900 text-white rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-600/20"
            >
              Confirmar suscripción de 20€ <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-slate-400 font-bold uppercase">
              <span className="flex items-center gap-1.5"><Lock size={12} /> SSL Secure</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Powered by Stripe</span>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Procesando pago...</h3>
            <p className="text-sm text-slate-500">Estamos conectando de forma segura con tu banco.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">¡Pago Completado!</h3>
            <p className="text-sm text-slate-500 mb-2">Tu cuenta ha sido actualizada a PRO.</p>
            <p className="text-xs font-bold text-emerald-600">Redirigiendo a tu panel...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
