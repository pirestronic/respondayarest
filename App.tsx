
import React, { useState } from 'react';
import { User, UserRole } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ChatWindow from './components/ChatWindow';
import SettingsView from './components/SettingsView';
import AdminView from './components/AdminView';
import ServicesView from './components/ServicesView';
import BillingView from './components/BillingView';
import AdminRevenueView from './components/AdminRevenueView';
import AdminFiscalView from './components/AdminFiscalView';
import { MOCK_CHATS } from './constants';
import { User as UserIcon, Lock, Mail, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<UserRole>('RESTAURANT');

  const handleLogin = (selectedRole: UserRole) => {
    // Calculamos 30 días a partir de hoy para el trial
    const trialDate = new Date();
    trialDate.setDate(trialDate.getDate() + 30);

    setIsAuthenticated(true);
    setRole(selectedRole);
    setUser({
      id: '1',
      name: selectedRole === 'ADMIN' ? 'Admin Plataforma' : 'Restaurante Casa Paco',
      email: selectedRole === 'ADMIN' ? 'admin@respondeyarest.com' : 'paco@casapaco.es',
      role: selectedRole,
      status: 'TRIAL',
      createdAt: new Date().toISOString().split('T')[0],
      trialEndsAt: trialDate.toISOString(),
      isUnlimited: false
    });
    setActiveTab(selectedRole === 'ADMIN' ? 'admin-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl text-white font-black text-3xl shadow-xl shadow-emerald-500/30 mb-4">R</div>
            <h1 className="text-3xl font-bold text-white mb-2">RespondeYa<span className="text-emerald-500">Rest</span></h1>
            <p className="text-slate-400">Automatiza tu WhatsApp, ahorra horas de atención.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Inicia sesión en tu panel</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => handleLogin('RESTAURANT')}
                  className="bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  Restaurante <ChevronRight size={16} />
                </button>
                <button 
                  onClick={() => handleLogin('ADMIN')}
                  className="bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  Admin <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">¿No tienes cuenta? <span className="text-emerald-600 font-bold cursor-pointer">Crea tu prueba de 30 días</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      role={role} 
      user={user!}
      onLogout={handleLogout}
    >
      {/* Restaurant Views */}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'messages' && <ChatWindow conversations={MOCK_CHATS} />}
      {activeTab === 'config' && <SettingsView />}
      {activeTab === 'services' && <ServicesView />}
      {activeTab === 'billing' && <BillingView />}

      {/* Admin Views */}
      {activeTab === 'admin-dashboard' && <AdminView />}
      {activeTab === 'admin-revenue' && <AdminRevenueView />}
      {activeTab === 'admin-config' && <AdminFiscalView />}
      {activeTab === 'admin-users' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b"><h3 className="font-bold">Gestión de Clientes</h3></div>
           <div className="p-12 text-center text-slate-400">Listado completo de restaurantes con buscador y filtros avanzados.</div>
        </div>
      )}
    </Layout>
  );
};

export default App;
