import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MessageSquareCode, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Phone, 
  Trash2,
  AlertTriangle,
  Tag
} from 'lucide-react';
import { initialLeads, Lead } from '../data/leads';
import { clinics } from '../data/clinics';

interface PipelineViewProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onConvertLeadToPatient?: (lead: any) => void;
}

export default function PipelineView({ showToast, onConvertLeadToPatient }: PipelineViewProps) {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('asck_crm_leads');
    if (saved) return JSON.parse(saved);
    return initialLeads;
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

  // Save leads state
  const saveLeads = (updated: Lead[]) => {
    setLeads(updated);
    localStorage.setItem('asck_crm_leads', JSON.stringify(updated));
  };

  const stages: Lead['stage'][] = [
    'Nuevo', 
    'Contactado', 
    'Agendado', 
    'Confirmado', 
    'Asistió', 
    'Tratamiento propuesto', 
    'Cerrado', 
    'Perdido'
  ];

  // Colors for urgency
  const getUrgencyClass = (urgency: Lead['urgency']) => {
    switch (urgency) {
      case 'Alta': return 'bg-red-50 text-red-600 border border-red-100';
      case 'Media': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Baja': return 'bg-slate-100 text-slate-550 border border-slate-200';
    }
  };

  // Move lead stage
  const moveLead = (leadId: string, direction: 'left' | 'right') => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const currentIdx = stages.indexOf(l.stage);
        let newIdx = currentIdx;
        if (direction === 'left' && currentIdx > 0) newIdx--;
        if (direction === 'right' && currentIdx < stages.length - 1) newIdx++;
        
        const newStage = stages[newIdx];
        showToast(`Paciente "${l.name}" movido a "${newStage}"`, 'success');
        return { 
          ...l, 
          stage: newStage,
          lastContact: 'Hace un momento'
        };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Delete lead
  const deleteLead = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el prospecto "${name}"?`)) {
      const updated = leads.filter(l => l.id !== id);
      saveLeads(updated);
      showToast(`Prospecto "${name}" eliminado del pipeline.`, 'info');
    }
  };

  // Add Lead Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadTreatment, setNewLeadTreatment] = useState(activeClinic.treatments[0]?.name || '');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadUrgency, setNewLeadUrgency] = useState<'Baja' | 'Media' | 'Alta'>('Media');
  const [newLeadSource, setNewLeadSource] = useState<'Facebook' | 'Instagram' | 'Google' | 'WhatsApp' | 'Recomendado' | 'Formulario'>('WhatsApp');

  useEffect(() => {
    if (activeClinic.treatments && activeClinic.treatments.length > 0) {
      setNewLeadTreatment(activeClinic.treatments[0].name);
    }
  }, [activeClinic]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newLeadName,
      treatment: newLeadTreatment,
      phone: newLeadPhone,
      urgency: newLeadUrgency,
      source: newLeadSource,
      lastContact: 'Hace un momento',
      stage: 'Nuevo',
      createdAt: new Date().toISOString()
    };
    saveLeads([newLead, ...leads]);
    setModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadUrgency('Media');
    showToast(`Prospecto "${newLeadName}" agregado correctamente.`, 'success');
  };

  // Prefilled WhatsApp message
  const getWhatsAppLink = (lead: Lead) => {
    const textMsg = `Hola ${lead.name}, te escribimos de ${activeClinic.name}. Vimos tu interés en el tratamiento de ${lead.treatment}. ¿Te gustaría confirmar tu cita de valoración?`;
    return `https://wa.me/${lead.phone.replace(/\+/g, '')}?text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div id="pipeline-view-root" className="p-6 flex flex-col h-full bg-slate-50 dark:bg-slate-950 font-sans text-xs select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-5 gap-4 shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-2xl md:text-3xl tracking-tight">
            Pipeline de Pacientes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            CRM Operativo para el seguimiento y conversión de prospectos dentales en la clínica activa.
          </p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 active:scale-98 transition-all"
          style={{ backgroundColor: activeClinic.primaryColor }}
        >
          <Plus className="w-4 h-4" />
          Añadir Prospecto
        </button>
      </div>

      {/* Pipeline Board - Desplazamiento Vertical (De Arriba a Abajo) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-6 pt-6 pb-6 pr-1 select-none">
        
        {stages.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage);
          
          return (
            <div 
              key={stage}
              className="w-full bg-slate-100/60 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col p-4 shadow-xs space-y-3"
            >
              {/* Stage Header */}
              <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">{stage}</span>
                  <span className="bg-blue-600/20 text-blue-500 dark:text-blue-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {stageLeads.length} {stageLeads.length === 1 ? 'prospecto' : 'prospectos'}
                  </span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {stageLeads.length === 0 ? (
                  <div className="col-span-full text-center text-slate-400 py-6 italic text-[11px]">
                    Sin prospectos en la etapa {stage.toLowerCase()}
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="bg-white dark:bg-slate-850 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3.5 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      {/* Name & Actions */}
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs">{lead.name}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{lead.treatment}</span>
                        </div>
                        <button 
                          onClick={() => deleteLead(lead.id, lead.name)}
                          className="text-slate-350 hover:text-red-500 p-0.5 transition-colors cursor-pointer shrink-0"
                          title="Eliminar prospecto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Source & Urgency Badges */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getUrgencyClass(lead.urgency)}`}>
                          {lead.urgency}
                        </span>
                        <span className="bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5" /> {lead.source}
                        </span>
                      </div>

                      {/* Card Footer: WhatsApp & Move Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center gap-2">
                        <span className="text-[9px] text-slate-400 shrink-0">{lead.lastContact}</span>
                        
                        <div className="flex items-center gap-1">
                          {/* Move Left */}
                          <button 
                            disabled={stage === 'Nuevo'}
                            onClick={() => moveLead(lead.id, 'left')}
                            className="p-1 hover:bg-slate-50 border border-slate-200 rounded-md text-slate-600 disabled:opacity-40 transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Send WhatsApp */}
                          <a 
                            href={getWhatsAppLink(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-1 rounded-md flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title="Contactar por WhatsApp"
                          >
                            <MessageSquareCode className="w-3.5 h-3.5" />
                          </a>

                          {/* Convert to Patient */}
                          {onConvertLeadToPatient && (
                            <button
                              onClick={() => onConvertLeadToPatient(lead)}
                              className="bg-sky-600 hover:bg-sky-700 text-white p-1 rounded-md flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                              title="Convertir a Paciente"
                            >
                              <Users className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Move Right */}
                          <button 
                            disabled={stage === 'Perdido'}
                            onClick={() => moveLead(lead.id, 'right')}
                            className="p-1 hover:bg-slate-50 border border-slate-200 rounded-md text-slate-600 disabled:opacity-40 transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}

      </div>

      {/* Add Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-fade-in font-sans text-xs">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight border-b border-slate-100 pb-2">
              Añadir Prospecto Dental
            </h3>
            
            <form onSubmit={handleAddLead} className="space-y-3 font-semibold">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="Ej. Ana María"
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">WhatsApp / Teléfono</label>
                <input 
                  type="tel" 
                  required 
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="Ej. +525512345678"
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tratamiento de Interés</label>
                <select 
                  value={newLeadTreatment}
                  onChange={(e) => setNewLeadTreatment(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 cursor-pointer"
                >
                  {activeClinic.treatments.map((t: any) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Urgencia</label>
                  <select 
                    value={newLeadUrgency}
                    onChange={(e) => setNewLeadUrgency(e.target.value as any)}
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 cursor-pointer"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Canal de Origen</label>
                  <select 
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value as any)}
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 cursor-pointer"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google">Google</option>
                    <option value="Recomendado">Recomendado</option>
                    <option value="Formulario">Formulario Web</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2 text-xs">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
                  style={{ backgroundColor: activeClinic.primaryColor }}
                >
                  Agregar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
