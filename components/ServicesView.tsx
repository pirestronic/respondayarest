
import React, { useState } from 'react';
import { MOCK_RESTAURANT_INFO } from '../constants';
import { Gift, Plus, Trash2, Euro, BookText, Upload, FileText, Save } from 'lucide-react';

const ServicesView: React.FC = () => {
  const [services, setServices] = useState(MOCK_RESTAURANT_INFO.services);

  const addService = () => {
    setServices([...services, { title: '', description: '', price: '', pdf: '' }]);
  };

  const removeService = (idx: number) => {
    setServices(services.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Gift className="text-emerald-500" /> Servicios y Experiencias
          </h2>
          <p className="text-slate-500 text-sm">Gestiona catas, eventos privados o menús de grupo.</p>
        </div>
        <button 
          onClick={() => alert('¡Servicios actualizados!')}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          <Save size={18} /> Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
            <button 
              onClick={() => removeService(idx)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Título del Servicio</label>
                  <input 
                    type="text" 
                    value={service.title} 
                    onChange={e => {
                      const n = [...services]; n[idx].title = e.target.value; setServices(n);
                    }}
                    placeholder="Ej: Cata de Vinos Ribera"
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Descripción detallada</label>
                  <textarea 
                    rows={3}
                    value={service.description} 
                    onChange={e => {
                      const n = [...services]; n[idx].description = e.target.value; setServices(n);
                    }}
                    placeholder="Indica qué incluye la experiencia..."
                    className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Precio aproximado</label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      value={service.price} 
                      onChange={e => {
                        const n = [...services]; n[idx].price = e.target.value; setServices(n);
                      }}
                      placeholder="35€ / persona"
                      className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Dossier Informativo (PDF)</label>
                  <button 
                    onClick={() => alert('Carga de dossier...')}
                    className={`w-full py-3 px-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${service.pdf ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-emerald-300'}`}
                  >
                    {service.pdf ? <FileText size={16} /> : <Upload size={16} />}
                    <span className="text-xs font-bold">{service.pdf || "Subir PDF"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addService}
          className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 flex flex-col items-center justify-center gap-2 hover:border-emerald-300 hover:text-emerald-600 transition-all"
        >
          <div className="p-2 bg-slate-100 rounded-full group-hover:bg-emerald-100 transition-colors">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold">Añadir Nueva Experiencia</span>
        </button>
      </div>
    </div>
  );
};

export default ServicesView;
