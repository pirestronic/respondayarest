
import React from 'react';
import { UserRole, User } from '../types';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role, user, onLogout }) => {
  const nav = role === 'ADMIN' ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  const getRemainingTrialDays = () => {
    const end = new Date(user.trialEndsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const remainingDays = getRemainingTrialDays();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden flex-col md:flex-row">
      {/* Header Móvil */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm z-50">
        <h1 className="text-lg font-black flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">R</div>
          RespondeYa<span className="text-emerald-600">Rest</span>
        </h1>
        <button 
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold active:scale-95 transition-all"
        >
          <LogOut size={14} /> Salir
        </button>
      </header>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black">R</div>
            RespondeYa<span className="text-emerald-500">Rest</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
              {user.name[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full text-xs font-semibold text-slate-400 hover:text-white text-left px-2 flex items-center gap-2"
          >
            <LogOut size={14} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Trial Banner */}
        {role === 'RESTAURANT' && user.status === 'TRIAL' && !user.isUnlimited && (
          <div className="bg-emerald-50 text-emerald-700 px-4 md:px-6 py-2 text-[10px] sm:text-xs font-medium flex justify-between items-center border-b border-emerald-100">
            <span className="truncate mr-2">🚀 Prueba de 1 mes: <strong>{remainingDays} días restantes.</strong></span>
            <button 
              onClick={() => setActiveTab('billing')}
              className="underline hover:text-emerald-900 transition-colors font-bold whitespace-nowrap"
            >
              Activar PRO
            </button>
          </div>
        )}
        
        {role === 'RESTAURANT' && user.isUnlimited && (
          <div className="bg-slate-900 text-emerald-400 px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex justify-center items-center border-b border-white/5">
            ✨ Acceso Ilimitado Activado
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around items-center bg-white border-t p-2 sticky bottom-0 z-50">
          {nav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 ${
                  activeTab === item.id ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-400'
                }`}
              >
                <Icon size={20} />
                <span className="text-[9px] font-bold mt-1 uppercase tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
