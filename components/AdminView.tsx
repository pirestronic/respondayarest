
import React, { useState, useEffect } from 'react';
import { Users, CreditCard, MessageSquare, Clock, ArrowUpRight, ArrowDownRight, RotateCcw, Infinity, Trash2 } from 'lucide-react';
import { User } from '../types';

const AdminView: React.FC = () => {
  const [restaurants, setRestaurants] = useState<User[]>(() => {
    const saved = localStorage.getItem('platform_users');
    if (saved) return JSON.parse(saved);
    
    return [
      { id: '1', name: 'Restaurante El Olivo', email: 'hola@elolivo.com', status: 'ACTIVE', createdAt: '2024-03-10', trialEndsAt: '2024-04-10', role: 'RESTAURANT', isUnlimited: false },
      { id: '2', name: 'Pizzería Da Luigi', email: 'luigi@pizzeria.it', status: 'TRIAL', createdAt: '2024-03-14', trialEndsAt: '2024-04-14', role: 'RESTAURANT', isUnlimited: false },
      { id: '3', name: 'Sushi Zen', email: 'contacto@sushizen.es', status: 'ACTIVE', createdAt: '2024-03-05', trialEndsAt: '2024-04-05', role: 'RESTAURANT', isUnlimited: true },
    ];
  });

  const stats = [
    { label: 'Ingresos Mensuales', value: '2,480 €', trend: '+14%', icon: CreditCard, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Restaurantes Activos', value: restaurants.length.toString(), trend: '+5', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Mensajes Procesados', value: '45.2k', trend: '+22%', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { label: 'Restaurantes en Prueba', value: restaurants.filter(r => r.status === 'TRIAL').length.toString(), trend: '-2', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  ];

  useEffect(() => {
    localStorage.setItem('platform_users', JSON.stringify(restaurants));
  }, [restaurants]);

  const handleRenewMonth = (index: number) => {
    setRestaurants(prevRestaurants => {
      const newRestList = [...prevRestaurants];
      const targetRest = newRestList[index];
      
      const currentEnd = new Date(targetRest.trialEndsAt);
      currentEnd.setDate(currentEnd.getDate() + 30);
      
      // Actualización inmutable del objeto para forzar re-render
      newRestList[index] = {
        ...targetRest,
        trialEndsAt: currentEnd.toISOString()
      };
      
      alert(`Se han añadido 30 días adicionales a ${targetRest.name}. Nueva fecha: ${currentEnd.toLocaleDateString()}`);
      return newRestList;
    });
  };

  const handleToggleUnlimited = (index: number) => {
    setRestaurants(prevRestaurants => {
      const newRestList = [...prevRestaurants];
      newRestList[index] = {
        ...newRestList[index],
        isUnlimited: !newRestList[index].isUnlimited
      };
      return newRestList;
    });
  };

  const handleDelete = (index: number) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${restaurants[index].name}?`)) {
      setRestaurants(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Panel de Administración</h2>
        <p className="text-slate-500">Gestión global de la plataforma RespondeYaRest.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900">Gestión de Restaurantes</h3>
            <p className="text-xs text-slate-500">Controla periodos de prueba y accesos especiales.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Restaurante</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Expira / Trial</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {restaurants.map((user, i) => (
                <tr key={user.id} className={`hover:bg-slate-50/80 transition-colors ${user.isUnlimited ? 'bg-emerald-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold w-fit uppercase tracking-wider ${
                        user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' :
                        user.status === 'TRIAL' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {user.status}
                      </span>
                      {user.isUnlimited && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                          <Infinity size={10} /> Ilimitado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-900">
                      {new Date(user.trialEndsAt).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {Math.ceil((new Date(user.trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días restantes
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleRenewMonth(i)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                        title="Añadir 30 días de prueba"
                      >
                        <RotateCcw size={14} /> +30 Días
                      </button>
                      <button 
                        onClick={() => handleToggleUnlimited(i)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-[11px] font-bold transition-all shadow-sm ${
                          user.isUnlimited 
                            ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
                        }`}
                        title="Hacer acceso ilimitado"
                      >
                        <Infinity size={14} /> {user.isUnlimited ? 'Estándar' : 'Ilimitado'}
                      </button>
                      <button 
                        onClick={() => handleDelete(i)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
