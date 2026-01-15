
import React, { useState, useEffect } from 'react';
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
import AdminLoginModal from './components/AdminLoginModal';
import Toast from './components/Toast';
import { MOCK_CHATS } from './constants';
import { Lock, Mail, ChevronRight, Utensils, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<UserRole>('RESTAURANT');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  
  // Estado de WhatsApp persistente
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(() => {
    return localStorage.getItem('ws_connected') === 'true';
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
      setIsAuthenticated(true);
      setActiveTab(parsedUser.role === 'ADMIN' ? 'admin-dashboard' : 'dashboard');
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trialDate = new Date();
    trialDate.setDate(trialDate.getDate() + 30); // Actualizado a 30 días

    const loggedUser: User = {
      id: 'usr_' + Date.now(),
      name: 'Restaurante Demo',
      email: 'demo@restaurante.com',
      role: 'RESTAURANT',
      status: 'TRIAL',
      createdAt: new Date().toISOString(),
      trialEndsAt: trialDate.toISOString(),
      isUnlimited: false
    };

    saveSession(loggedUser);
    showToast("¡Bienvenido de nuevo!");
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const trialDate = new Date();
    trialDate.setDate(trialDate.getDate() + 30); // Actualizado a 30 días

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: (form.elements.namedItem('restaurantName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      role: 'RESTAURANT',
      status: 'TRIAL',
      createdAt: new Date().toISOString(),
      trialEndsAt: trialDate.toISOString(),
      isUnlimited: false
    };

    saveSession(newUser);
    showToast("¡Registro completado! Tienes 30 días de prueba gratuita.");
    
    const allUsers = JSON.parse(localStorage.getItem('platform_users') || '[]');
    localStorage.setItem('platform_users', JSON.stringify([...allUsers, newUser]));
  };

  const handleAdminAuth = (password: string) => {
    if (password === 'Uno*uno1') {
      const adminUser: User = {
        id: 'admin_1',
        name: 'Administrador SaaS',
        email: 'admin@respondeyarest.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        trialEndsAt: new Date().toISOString(),
        isUnlimited: true
      };
      saveSession(adminUser);
      setIsAdminLoginOpen(false);
      showToast("Acceso de administrador concedido", "info");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const saveSession = (userData: User) => {
    localStorage.setItem('user_session', JSON.stringify(userData));
    setUser(userData);
    setRole(userData.role);
    setIsAuthenticated(true);
    setActiveTab(userData.role === 'ADMIN' ? 'admin-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleWhatsApp = (connected: boolean) => {
    setIsWhatsAppConnected(connected);
    localStorage.setItem('ws_connected', String(connected));
    if (connected) showToast("WhatsApp conectado con éxito");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
        {toast && <Toast message={toast.message} type={toast.type} />}
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-[2rem] text-white font-black text-4xl shadow-2xl shadow-emerald-500/20 mb-6">R</div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">RespondeYa<span className="text-emerald-500">Rest</span></h1>
            <p className="text-slate-400 font-medium">Automatiza tu WhatsApp Business con IA</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-black/50 border border-white/10 relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">
              {isRegistering ? 'Crea tu cuenta' : 'Iniciar Sesión'}
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8 font-medium">
              {isRegistering ? 'Empieza tu prueba de 30 días gratis' : 'Gestiona tus conversaciones con IA'}
            </p>
            
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
              {isRegistering && (
                <div className="relative">
                  <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    name="restaurantName"
                    required
                    type="text" 
                    placeholder="Nombre del Restaurante" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  name="email"
                  required
                  type="email" 
                  placeholder="Tu email de contacto" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group"
              >
                {isRegistering ? 'Crear Cuenta Gratis' : 'Entrar al Panel'} 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-slate-500 font-bold hover:text-emerald-600 transition-colors text-center"
              >
                {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo aquí? Regístrate en 1 minuto'}
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Plataforma</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button 
                onClick={() => setIsAdminLoginOpen(true)}
                className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} /> Panel de Administrador
              </button>
            </div>
          </div>
        </div>
        
        {isAdminLoginOpen && (
          <AdminLoginModal 
            onClose={() => setIsAdminLoginOpen(false)} 
            onAuth={handleAdminAuth} 
          />
        )}
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
      {toast && <Toast message={toast.message} type={toast.type} />}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'messages' && (
        <ChatWindow 
          conversations={MOCK_CHATS} 
          isConnected={isWhatsAppConnected}
          onConnect={() => toggleWhatsApp(true)}
          onDisconnect={() => toggleWhatsApp(false)}
        />
      )}
      {activeTab === 'config' && <SettingsView />}
      {activeTab === 'services' && <ServicesView />}
      {activeTab === 'billing' && <BillingView />}
      {activeTab === 'admin-dashboard' && <AdminView />}
      {activeTab === 'admin-revenue' && <AdminRevenueView />}
      {activeTab === 'admin-config' && <AdminFiscalView />}
      {activeTab === 'admin-users' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black">Gestión de Restaurantes</h2>
          <p className="text-slate-500">Próximamente: Lista completa de registros en tiempo real.</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
