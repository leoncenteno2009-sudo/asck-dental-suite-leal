import React, { useState, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Save, 
  RefreshCw, 
  Smartphone, 
  Variable, 
  Send,
  HelpCircle,
  Clock
} from 'lucide-react';
import { initialTemplates, WhatsAppTemplate } from '../data/templates';
import { clinics } from '../data/clinics';

interface WhatsAppCenterProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export default function WhatsAppCenter({ showToast }: WhatsAppCenterProps) {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(() => {
    const saved = localStorage.getItem('asck_wa_templates');
    if (saved) return JSON.parse(saved);
    return initialTemplates;
  });

  const [activeClinic, setActiveClinic] = useState<any>(clinics[0]);

  // Sync active clinic configuration from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('asck_active_clinic');
    if (saved) {
      const match = clinics.find(c => c.id === saved);
      if (match) setActiveClinic(match);
    }
  }, []);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || 't-1');
  const activeTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  
  const [editedBody, setEditedBody] = useState(activeTemplate?.body || '');

  // Variable values for live preview
  const [varNombre, setVarNombre] = useState('Elena Martínez');
  const [varTratamiento, setVarTratamiento] = useState('Ortodoncia Invisible');
  const [varFecha, setVarFecha] = useState('03 de Julio de 2026');
  const [varHora, setVarHora] = useState('04:30 PM');
  const [varPrecio, setVarPrecio] = useState('$14,500 MXN');

  // Update editor when template changes
  useEffect(() => {
    if (activeTemplate) {
      setEditedBody(activeTemplate.body);
    }
  }, [selectedTemplateId]);

  // Save template edits
  const handleSaveTemplate = () => {
    const updated = templates.map(t => {
      if (t.id === selectedTemplateId) {
        return { ...t, body: editedBody };
      }
      return t;
    });
    setTemplates(updated);
    localStorage.setItem('asck_wa_templates', JSON.stringify(updated));
    showToast('Plantilla de WhatsApp guardada con éxito.', 'success');
  };

  // Replace variables in preview
  const getSubstitutedMessage = () => {
    let text = editedBody;
    text = text.replace(/{{nombre}}/g, varNombre);
    text = text.replace(/{{clinica}}/g, activeClinic.name);
    text = text.replace(/{{tratamiento}}/g, varTratamiento);
    text = text.replace(/{{fecha}}/g, varFecha);
    text = text.replace(/{{hora}}/g, varHora);
    text = text.replace(/{{ubicacion}}/g, 'Huixquilucan, Edo. Méx.');
    text = text.replace(/{{precio}}/g, varPrecio);
    return text;
  };

  return (
    <div id="whatsapp-center-root" className="p-6 flex flex-col h-full bg-slate-50 font-sans text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 gap-4 shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 text-2xl md:text-3xl tracking-tight">
            Centro de WhatsApp
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Gestión y personalización de plantillas de mensajería automatizada y seguimiento de pacientes.
          </p>
        </div>
        <button 
          onClick={handleSaveTemplate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 active:scale-98 transition-all"
          style={{ backgroundColor: activeClinic.primaryColor }}
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </div>

      {/* Main split: Templates list / Editor / Phone Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 h-[calc(100vh-210px)] overflow-hidden">
        
        {/* Columna 1: Listado de plantillas */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden max-h-full">
          <div className="p-3 bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider text-slate-400">
            Plantillas Disponibles
          </div>
          <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
            {templates.map((t) => (
              <div 
                key={t.id}
                onClick={() => setSelectedTemplateId(t.id)}
                className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                  t.id === selectedTemplateId ? 'bg-blue-50/40 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <h4 className="font-bold text-slate-900 text-xs">{t.name}</h4>
                <span className="text-[9px] text-slate-450 bg-slate-100 rounded px-1.5 py-0.5 inline-block mt-1 font-semibold">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna 2: Editor */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between max-h-full overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cuerpo de la Plantilla</span>
              <h3 className="font-bold text-slate-900 text-sm">{activeTemplate?.name}</h3>
            </div>

            {/* Texarea */}
            <div className="space-y-1.5">
              <textarea 
                rows={5}
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-3 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 leading-relaxed font-mono"
              />
              <span className="text-[10px] text-slate-400 leading-normal block">
                * Puedes usar las variables: {"{{nombre}}"}, {"{{clinica}}"}, {"{{tratamiento}}"}, {"{{fecha}}"}, {"{{hora}}"}, {"{{ubicacion}}"}, {"{{precio}}"}.
              </span>
            </div>

            {/* Test Variable inputs */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1.5">
                <Variable className="w-3.5 h-3.5 text-blue-600" /> Probar con Variables:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-0.5">Nombre Paciente</label>
                  <input 
                    type="text" 
                    value={varNombre}
                    onChange={(e) => setVarNombre(e.target.value)}
                    className="w-full text-xs rounded border border-slate-200 p-1.5 bg-slate-50/30" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-0.5">Tratamiento</label>
                  <input 
                    type="text" 
                    value={varTratamiento}
                    onChange={(e) => setVarTratamiento(e.target.value)}
                    className="w-full text-xs rounded border border-slate-200 p-1.5 bg-slate-50/30" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-0.5">Fecha</label>
                  <input 
                    type="text" 
                    value={varFecha}
                    onChange={(e) => setVarFecha(e.target.value)}
                    className="w-full text-xs rounded border border-slate-200 p-1.5 bg-slate-50/30" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-0.5">Hora</label>
                  <input 
                    type="text" 
                    value={varHora}
                    onChange={(e) => setVarHora(e.target.value)}
                    className="w-full text-xs rounded border border-slate-200 p-1.5 bg-slate-50/30" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <button 
              onClick={() => setEditedBody(activeTemplate?.body || '')}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer"
            >
              Reestablecer
            </button>
            <button 
              onClick={handleSaveTemplate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
              style={{ backgroundColor: activeClinic.primaryColor }}
            >
              Guardar Plantilla
            </button>
          </div>
        </div>

        {/* Columna 3: Phone Preview */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center max-h-full overflow-y-auto">
          <div className="space-y-4 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-450" /> Teléfono Demo (Preview)
            </span>
            
            {/* Phone Body Mockup */}
            <div className="w-56 h-[380px] bg-slate-900 rounded-[30px] border-4 border-slate-800 relative shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Speaker / Notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-800 rounded-full z-20"></div>

              {/* Phone Header screen */}
              <div className="bg-[#075e54] text-white py-4 px-3 flex items-center gap-2 pt-6 shrink-0">
                <div className="w-6 h-6 rounded-full bg-slate-200/80 text-[#075e54] font-bold text-[10px] flex items-center justify-center">
                  {activeClinic.logoText[0]}
                </div>
                <div className="text-left leading-none space-y-0.5">
                  <p className="font-bold text-[10px] truncate max-w-[120px]">{activeClinic.name}</p>
                  <span className="text-[7px] opacity-80 flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span> En línea
                  </span>
                </div>
              </div>

              {/* Chat Bubble screen */}
              <div className="flex-1 bg-[#ece5dd] p-3 overflow-y-auto space-y-3 flex flex-col justify-end">
                <div className="bg-white text-slate-850 rounded-xl rounded-tl-none p-2.5 max-w-[180px] self-start shadow-3xs text-[9px] leading-relaxed relative text-left">
                  {getSubstitutedMessage()}
                  <span className="text-[7px] text-slate-400 block text-right mt-1.5 font-bold">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Phone Input screen */}
              <div className="bg-slate-100 p-2 border-t border-slate-200 flex items-center gap-2 shrink-0">
                <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[8px] text-slate-400 text-left border border-slate-200">
                  Mensaje...
                </div>
                <div className="w-6 h-6 rounded-full bg-[#075e54] text-white flex items-center justify-center shrink-0 shadow-3xs">
                  <Send className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
