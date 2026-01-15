
import React, { useState } from 'react';
import { Lock, X, ShieldAlert } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onAuth: (password: string) => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onAuth }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(password);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldAlert size={20} className="text-amber-500" />
            <h3 className="text-lg font-black">Acceso Restringido</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-6">Introduce la clave de acceso para gestionar la plataforma global.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              autoFocus
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña Maestra" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
          >
            Verificar Identidad
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
