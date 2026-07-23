import { useState, useEffect } from 'react';
import { Stethoscope, BarChart3 } from 'lucide-react';
import { Patient, Appointment } from '../types';
import ClinicalDashboardView from './ClinicalDashboardView';
import CommercialDashboardView from './CommercialDashboardView';
import { clinics } from '../config/clinic.config';

interface DashboardViewProps {
  patients: Patient[];
  appointments: Appointment[];
  setAppointments: any;
  chats: any[];
  setChats: any;
  setCurrentTab: (tab: string) => void;
  setSelectedPatientId: (id: string) => void;
  searchQuery: string;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onOpenAppointmentModal: () => void;
  onOpenPatientModal: () => void;
}

export default function DashboardView(props: DashboardViewProps) {
  const [dashboardMode, setDashboardMode] = useState<'clinica' | 'comercial'>(() => {
    const saved = localStorage.getItem('asck_dashboard_mode');
    return (saved === 'clinica' || saved === 'comercial') ? saved : 'clinica';
  });

  const [activeClinic, setActiveClinic] = useState<any>(clinics[0]);

  // Sync active clinic configuration from localStorage to match theme accent
  useEffect(() => {
    const saved = localStorage.getItem('asck_active_clinic');
    if (saved) {
      const match = clinics.find(c => c.id === saved);
      if (match) setActiveClinic(match);
    }
  }, []);

  const handleModeChange = (mode: 'clinica' | 'comercial') => {
    setDashboardMode(mode);
    localStorage.setItem('asck_dashboard_mode', mode);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Dynamic Selector Toggle Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeClinic.accentColor || '#00d4b4' }}></div>
          <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Modo del Sistema
          </span>
        </div>
        
        {/* Toggle Pill */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-3xs">
          <button
            onClick={() => handleModeChange('clinica')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              dashboardMode === 'clinica'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-3xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            <Stethoscope className={`w-3.5 h-3.5 ${dashboardMode === 'clinica' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`} />
            Vista Clínica
          </button>
          
          <button
            onClick={() => handleModeChange('comercial')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              dashboardMode === 'comercial'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-3xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            <BarChart3 className={`w-3.5 h-3.5 ${dashboardMode === 'comercial' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`} />
            Vista Comercial
          </button>
        </div>
      </div>

      {/* Render Active Dashboard Panel */}
      <div className="flex-1 overflow-y-auto">
        {dashboardMode === 'clinica' ? (
          <ClinicalDashboardView {...props} />
        ) : (
          <CommercialDashboardView {...props} />
        )}
      </div>
    </div>
  );
}
