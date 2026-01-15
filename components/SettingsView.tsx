
import React, { useState } from 'react';
import { MOCK_RESTAURANT_INFO, COMMON_QUESTIONS } from '../constants';
import { Save, Plus, Trash2, Clock, MapPin, Phone, BookOpen, AlertCircle, Upload, FileText } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [info, setInfo] = useState(MOCK_RESTAURANT_INFO);
  const [activeSubTab, setActiveSubTab] = useState<'basic' | 'menu' | 'faq'>('basic');

  const handleSave = () => {
    alert('¡Información guardada correctamente! El sistema de IA ya está actualizado.');
  };

  const addFaq = () => {
    setInfo({ ...info, faqs: [...info.faqs, { question: '', answer: '' }] });
  };

  const PdfUpload = ({ label, fileName, onUpload }: { label: string, fileName?: string, onUpload: () => void }) => (
    <div className="p-4 sm:p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 flex flex-col items-center justify-center text-center gap-3 group hover:border-emerald-300 transition-all w-full overflow-hidden">
      <div className={`p-4 sm:p-5 rounded-2xl ${fileName ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-300 shadow-sm'}`}>
        {fileName ? <FileText size={28} /> : <Upload size={28} />}
      </div>
      <div className="w-full">
        <p className="text-sm font-bold text-slate-700 truncate px-2">{label}</p>
        <p className="text-[10px] text-slate-400 mt-1 truncate px-4">{fileName || "PDF (Max 5MB)"}</p>
      </div>
      <button 
        onClick={onUpload}
        className="px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors mt-1"
      >
        {fileName ? "Sustituir" : "Subir Archivo"}
      </button>
    </div>
  );

  const tabs = [
    { id: 'basic', label: 'Info Básica', icon: MapPin },
    { id: 'menu', label: 'Carta / PDF', icon: BookOpen },
    { id: 'faq', label: 'Preguntas', icon: Clock },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-32 md:pb-8 w-full overflow-x-hidden">
      {/* Header adaptable */}
      <div className="flex flex-col gap-4 px-1">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gestión del Negocio</h2>
          <p className="text-slate-500 text-sm font-medium">Configura lo que tu IA sabe sobre ti.</p>
        </div>
        
        {/* Selector de pestañas móvil mejorado con scroll lateral y padding */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:-mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all shadow-sm flex-shrink-0 ${
                activeSubTab === tab.id 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-4 sm:p-6 md:p-10 w-full overflow-hidden">
        {activeSubTab === 'basic' && (
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Nombre comercial
                </label>
                <input 
                  type="text" 
                  value={info.name} 
                  onChange={e => setInfo({...info, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-slate-800" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Horarios
                </label>
                <textarea 
                  rows={3}
                  value={info.hours} 
                  onChange={e => setInfo({...info, hours: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Dirección Física
                </label>
                <input 
                  type="text" 
                  value={info.address} 
                  onChange={e => setInfo({...info, address: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Teléfono WhatsApp
                </label>
                <input 
                  type="text" 
                  value={info.phone} 
                  onChange={e => setInfo({...info, phone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium" 
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'menu' && (
          <div className="space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <PdfUpload label="Carta del Restaurante" fileName={info.menuPdf} onUpload={() => alert("Cargando...")} />
              <PdfUpload label="Ficha de Alérgenos" fileName={info.allergensPdf} onUpload={() => alert("Cargando...")} />
            </div>
            
            <div className="pt-6 border-t border-slate-50 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notas e información adicional</label>
              <textarea 
                rows={6}
                value={info.menuText} 
                onChange={e => setInfo({...info, menuText: e.target.value})}
                placeholder="Añade aquí especialidades, platos del día o políticas que no estén en el PDF..."
                className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-none focus:ring-2 focus:ring-emerald-500/20 text-sm leading-relaxed" 
              />
            </div>
          </div>
        )}

        {activeSubTab === 'faq' && (
          <div className="space-y-8">
            <div className="p-5 sm:p-6 bg-slate-900 rounded-3xl flex gap-3 sm:gap-4 text-white">
              <AlertCircle className="text-emerald-400 flex-shrink-0" size={20} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Consejo Pro</p>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-medium">
                  Cuanto más detalle des aquí, menos veces tendrás que intervenir tú en los chats.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {info.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-6 bg-slate-50 rounded-3xl relative border border-slate-100 group transition-all hover:bg-white hover:shadow-lg w-full">
                  <button 
                    onClick={() => setInfo({...info, faqs: info.faqs.filter((_, i) => i !== idx)})}
                    className="absolute top-5 right-5 p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="space-y-5 pr-6 sm:pr-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Pregunta común</label>
                      <input 
                        list={`common-questions-${idx}`}
                        type="text" 
                        value={faq.question}
                        onChange={e => {
                          const newFaqs = [...info.faqs];
                          newFaqs[idx].question = e.target.value;
                          setInfo({...info, faqs: newFaqs});
                        }}
                        className="w-full bg-white px-4 sm:px-5 py-3 rounded-2xl border-none text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20" 
                      />
                      <datalist id={`common-questions-${idx}`}>
                        {COMMON_QUESTIONS.map(q => <option key={q} value={q} />)}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Respuesta automática</label>
                      <textarea 
                        rows={2}
                        value={faq.answer}
                        onChange={e => {
                          const newFaqs = [...info.faqs];
                          newFaqs[idx].answer = e.target.value;
                          setInfo({...info, faqs: newFaqs});
                        }}
                        className="w-full bg-white px-4 sm:px-5 py-3 rounded-2xl border-none text-sm font-medium shadow-sm focus:ring-2 focus:ring-emerald-500/20" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addFaq}
              className="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 flex flex-col items-center justify-center gap-2 hover:border-emerald-300 hover:text-emerald-600 transition-all font-bold"
            >
              <Plus size={32} />
              Nueva Pregunta
            </button>
          </div>
        )}
      </div>

      {/* Botón Guardar Flotante en Móvil - Ajustado para evitar solapamientos */}
      <div className="fixed bottom-20 left-0 right-0 p-4 md:static md:bottom-auto md:p-0 z-40 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent md:bg-none">
        <button 
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 rounded-2xl sm:rounded-[2rem] font-black text-base sm:text-lg shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <Save size={20} className="sm:w-6 sm:h-6" /> Guardar Configuración
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
