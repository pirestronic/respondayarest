
import React from 'react';
import { Bell, CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <div className="fixed top-6 right-6 z-[300] animate-in slide-in-from-right-8 duration-500">
      <div className={`px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 bg-white ${
        type === 'success' ? 'border-emerald-100 text-emerald-800' : 'border-blue-100 text-blue-800'
      }`}>
        <div className={`p-2 rounded-xl ${type === 'success' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
          {type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
        </div>
        <p className="text-sm font-bold">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
