
import React, { useState } from 'react';
import { FileText, Save, Building2, MapPin, Mail, Hash } from 'lucide-react';

const AdminFiscalView: React.FC = () => {
  const [fiscalData, setFiscalData] = useState({
    companyName: 'RespondeYaRest Solutions S.L.',
    taxId: 'B-12345678',
    address: 'Av. de la Inteligencia 42, 28001 Madrid, España',
    email: 'facturacion@respondeyarest.com'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Datos Fiscales y Facturación</h2>
          <p className="text-slate-500">Información legal que aparecerá en las facturas de tus clientes.</p>
        </div>
        <button 
          onClick={() => alert('Datos fiscales actualizados')}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg"
        >
          <Save size={18} /> Guardar Datos Legales
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Building2 size={14} /> Nombre de Empresa / Razón Social
              </label>
              <input 
                type="text" 
                value={fiscalData.companyName}
                onChange={e => setFiscalData({...fiscalData, companyName: e.target.value})}
                className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Hash size={14} /> CIF / NIF
              </label>
              <input 
                type="text" 
                value={fiscalData.taxId}
                onChange={e => setFiscalData({...fiscalData, taxId: e.target.value})}
                className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm font-mono focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <MapPin size={14} /> Dirección Fiscal Completa
              </label>
              <textarea 
                rows={2}
                value={fiscalData.address}
                onChange={e => setFiscalData({...fiscalData, address: e.target.value})}
                className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Mail size={14} /> Email de Facturación
              </label>
              <input 
                type="email" 
                value={fiscalData.email}
                onChange={e => setFiscalData({...fiscalData, email: e.target.value})}
                className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
             <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-500">
               <FileText size={24} />
             </div>
             <div className="flex-1">
               <h4 className="text-sm font-bold text-slate-900">Plantilla de Factura Automática</h4>
               <p className="text-xs text-slate-500">Se generará un PDF automático cada mes para cada cliente con estos datos.</p>
             </div>
             <button className="text-xs font-bold text-emerald-600 hover:underline">Vista Previa</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default AdminFiscalView;
