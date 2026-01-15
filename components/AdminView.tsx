
import React, { useState } from 'react';
import { Users, CreditCard, MessageSquare, Clock, ArrowUpRight, ArrowDownRight, RotateCcw, Infinity, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const AdminView: React.FC = () => {
  const [restaurants, setRestaurants] = useState([
    { name: 'Restaurante El Olivo', email: 'hola@elolivo.com', status: 'ACTIVE', joinDate: '2024-03-10', revenue: '20€', isUnlimited: false },
    { name: 'Pizzería Da Luigi', email: 'luigi@pizzeria.it', status: 'TRIAL', joinDate: '2024-03-14', revenue: '0€', isUnlimited: false },
    { name: 'Sushi Zen', email: 'contacto@sushizen.es', status: 'ACTIVE', joinDate: '2024-03-05', revenue: '20€', isUnlimited: true },
    { name: 'Burger Queen', email: 'admin@burgerqueen.com', status: 'UNPAID', joinDate: '2024-02-28', revenue: '20€', isUnlimited: false },
  ]);

  const stats = [
    { label: 'Ingresos Mensuales', value: '2,480 €', trend: '+14%', icon: CreditCard, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Restaurantes Activos', value: '124', trend: '+5', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Mensajes Procesados', value: '45.2k', trend: '+22%', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { label: 'Restaurantes en Prueba', value: '18', trend: '-2', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  ];

  const handleRenewMonth = (index: number) => {
    alert(`Se ha renovado un mes adicional para ${restaurants[index].name}`);
  };

  const handleToggleUnlimited = (index: number) => {
    const newRest = [...restaurants];
    newRest[index].isUnlimited = !newRest[index].isUnlimited;
    setRestaurants(newRest);
    alert(`${restaurants[index].name} ahora tiene acceso ${newRest[index].isUnlimited ? 'ILIMITADO' : 'ESTÁNDAR'}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Panel de Administración</h2>
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
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900">Gestión de Restaurantes</h3>
            <p className="text-xs text-slate-500">Controla periodos de prueba y accesos especiales.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-bold bg-white border px-3 py-2 rounded-lg hover:bg-slate-50">Exportar CSV</button>
            <button className="text-xs font-bold bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700">Añadir Nuevo</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Restaurante</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Suscripción</th>
                <th className="px-6 py-4">Acciones de Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {restaurants.map((user, i) => (
                <tr key={i} className={`hover:bg-slate-50/80 transition-colors ${user.isUnlimited ? 'bg-emerald-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold w-fit ${
                        user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' :
                        user.status === 'TRIAL' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {user.status}
                      </span>
                      {user.isUnlimited && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <Infinity size={10} /> ILIMITADO
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-900">{user.revenue} / mes</div>
                    <div className="text-[10px] text-slate-400">Desde: {user.joinDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleRenewMonth(i)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                        title="Añadir 30 días de prueba"
                      >
                        <RotateCcw size={14} /> +30 Días
                      </button>
                      <button 
                        onClick={() => handleToggleUnlimited(i)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[11px] font-bold transition-all shadow-sm ${
                          user.isUnlimited 
                            ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
                        }`}
                        title="Hacer acceso ilimitado"
                      >
                        <Infinity size={14} /> {user.isUnlimited ? 'Quitar Ilimitado' : 'Hacer Ilimitado'}
                      </button>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
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
