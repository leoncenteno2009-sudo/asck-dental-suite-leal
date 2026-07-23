import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  Clock, 
  Building,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Patient, Appointment } from '../types';
import { initialLeads, Lead } from '../data/leads';
import { clinics } from '../data/clinics';

interface DashboardViewProps {
  patients: Patient[];
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  chats: any[];
  setChats: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentTab: (tab: string) => void;
  setSelectedPatientId: (id: string) => void;
  searchQuery: string;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onOpenAppointmentModal: () => void;
  onOpenPatientModal: () => void;
}

export default function DashboardView({
  patients,
  appointments,
  setCurrentTab,
  showToast,
  onOpenAppointmentModal,
  onOpenPatientModal
}: DashboardViewProps) {
  const [activeClinic, setActiveClinic] = useState<any>(clinics[0]);
  const [leadsList, setLeadsList] = useState<Lead[]>(initialLeads);

  // Sync active clinic configuration from localStorage if it exists
  useEffect(() => {
    const saved = localStorage.getItem('asck_active_clinic');
    if (saved) {
      const match = clinics.find(c => c.id === saved);
      if (match) setActiveClinic(match);
    }
  }, []);

  // Compute stats
  const totalLeads = leadsList.length;
  const newLeads = leadsList.filter(l => l.stage === 'Nuevo').length;
  
  // Compute appointments today
  const todayStr = new Date().toISOString().split('T')[0];
  // Since mock dates are in June/July 2026, we check the matches
  const appointmentsToday = appointments.filter(a => a.date === '2026-07-03' || a.date === todayStr);
  const confirmedTodayCount = appointmentsToday.filter(a => a.status === 'Confirmada' || a.status === 'Asistió').length;

  const pendingWhatsAppCount = leadsList.filter(l => l.stage === 'Nuevo' || l.stage === 'Contactado').length;

  return (
    <div id="dashboard-view-root" className="p-6 overflow-y-auto space-y-6 bg-slate-50 min-h-full font-sans text-xs">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 uppercase tracking-wider">
            Núcleo Clínico Configurado
          </span>
          <h2 className="font-bold text-slate-900 text-2xl md:text-3xl tracking-tight mt-1">
            Resumen General: {activeClinic.name}
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Tablero administrativo de control de prospectos, agenda y conversión comercial.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={onOpenPatientModal}
            className="bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4" />
            Nuevo Paciente
          </button>
          <button 
            onClick={onOpenAppointmentModal}
            className="bg-[#00346f] hover:bg-[#002652] text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 active:scale-98 transition-all"
            style={{ backgroundColor: activeClinic.primaryColor }}
          >
            <Calendar className="w-4 h-4" />
            Programar Cita
          </button>
        </div>
      </div>

      {/* Bento Grid KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1 - Prospectos */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total de Prospectos</span>
              <p className="text-3xl font-extrabold text-slate-900">{totalLeads}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center" style={{ color: activeClinic.primaryColor }}>
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% esta semana</span>
          </div>
        </div>

        {/* KPI 2 - Solicitudes Nuevas */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Nuevas Solicitudes</span>
              <p className="text-3xl font-extrabold text-slate-900">{newLeads}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-orange-600 font-bold text-[10px]">
            <span>Requieren contacto inmediato</span>
          </div>
        </div>

        {/* KPI 3 - Citas de Hoy */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Agenda de Hoy</span>
              <p className="text-3xl font-extrabold text-slate-900">{appointmentsToday.length}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-teal-600 font-bold text-[10px]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {confirmedTodayCount} Confirmadas
            </span>
          </div>
        </div>

        {/* KPI 4 - WhatsApp Pendientes */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Mensajes Pendientes</span>
              <p className="text-3xl font-extrabold text-slate-900">{pendingWhatsAppCount}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#20ba5a] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-[#20ba5a] font-bold text-[10px]">
            <span>Seguimientos por enviar</span>
          </div>
        </div>

      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <h3 className="font-bold text-slate-950 text-xs mb-3 uppercase tracking-wider">Accesos Rápidos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button 
            onClick={() => setCurrentTab('pipeline')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center space-y-1 font-bold text-[11px] text-slate-800 cursor-pointer"
          >
            📊 Tablero CRM (Pipeline)
          </button>
          <button 
            onClick={() => setCurrentTab('agenda')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center space-y-1 font-bold text-[11px] text-slate-800 cursor-pointer"
          >
            📅 Agenda de Citas
          </button>
          <button 
            onClick={() => setCurrentTab('whatsapp')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center space-y-1 font-bold text-[11px] text-slate-800 cursor-pointer"
          >
            💬 Centro de WhatsApp
          </button>
          <button 
            onClick={() => setCurrentTab('configuracion')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center space-y-1 font-bold text-[11px] text-slate-800 cursor-pointer"
          >
            ⚙️ Personalizar Marca
          </button>
        </div>
      </div>

      {/* Dos Columnas: Citas y Prospectos Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna Citas de Hoy */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-450" /> Citas para Hoy (MX)
            </h3>
            <button 
              onClick={() => setCurrentTab('agenda')}
              className="text-xs font-bold text-[#00346f] hover:underline cursor-pointer flex items-center"
              style={{ color: activeClinic.primaryColor }}
            >
              Ver Agenda <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto pr-1">
            {appointmentsToday.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-semibold">
                No hay citas programadas para hoy en esta clínica.
              </div>
            ) : (
              appointmentsToday.map((appt) => (
                <div key={appt.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-950 text-xs">{appt.patient?.name || appt.patientId}</h4>
                    <div className="flex items-center gap-2 text-slate-400 font-semibold text-[10px]">
                      <span>{appt.time}</span>
                      <span>·</span>
                      <span>{appt.treatment}</span>
                      <span>·</span>
                      <span className="text-slate-500 font-bold">{appt.doctor}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      appt.status === 'Confirmada' || appt.status === 'Asistió'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna Prospectos Recientes */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-450" /> Solicitudes Recientes
            </h3>
            <button 
              onClick={() => setCurrentTab('pipeline')}
              className="text-xs font-bold text-[#00346f] hover:underline cursor-pointer flex items-center"
              style={{ color: activeClinic.primaryColor }}
            >
              Ver Pipeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto pr-1">
            {leadsList.slice(0, 5).map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-950 text-xs">{lead.name}</h4>
                  <div className="flex items-center gap-2 text-slate-400 font-semibold text-[10px]">
                    <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-md font-bold text-[9px] uppercase">{lead.urgency}</span>
                    <span>·</span>
                    <span>{lead.treatment}</span>
                    <span>·</span>
                    <span>{lead.source}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{lead.lastContact}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" style={{ backgroundColor: activeClinic.primaryColor }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Módulo de Cumplimiento Informativo */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-500 font-semibold text-[11px] leading-relaxed">
        <div>
          <span className="font-bold text-slate-800 block mb-0.5">Nota de Seguridad de la Demo</span>
          Esta demostración comercial utiliza bases de datos de prospectos simuladas y está estructurada sobre un núcleo común configurable. La conexión de APIs de WhatsApp simula el flujo real mediante enlaces estandarizados de la API pública.
        </div>
        <div className="text-[9px] text-slate-400 border border-slate-200 bg-white rounded-lg p-2 shrink-0">
          Ubicación Servidor: Local (SQLite)<br />
          Tono de Demo: Aprobado por Stitch
        </div>
      </div>

    </div>
  );
}
