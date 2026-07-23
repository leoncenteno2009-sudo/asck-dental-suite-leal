import { useState } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  MessageSquare, 
  Sparkles, 
  Menu,
  X,
  XCircle
} from 'lucide-react';
import { markNotificationsRead } from '../api';
import type { Patient } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  notificationsCount: number;
  setNotificationsCount: (count: number) => void;
  onTriggerAIAssistant: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  patients: Patient[];
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  clinicName?: string;
}

export default function Header({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  notificationsCount,
  setNotificationsCount,
  onTriggerAIAssistant,
  mobileMenuOpen,
  setMobileMenuOpen,
  patients,
  selectedPatientId,
  setSelectedPatientId,
  notifications,
  setNotifications,
  clinicName = 'Clínica Dental'
}: HeaderProps) {
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // Selector dinámico de placeholder de búsqueda en español
  const getSearchPlaceholder = () => {
    switch (currentTab) {
      case 'calendar':
        return 'Buscar pacientes, médicos...';
      case 'presupuestos':
        return 'Buscar pacientes, presupuestos...';
      default:
        return 'Buscar pacientes, citas...';
    }
  };

  const clearNotifications = async () => {
    try {
      await markNotificationsRead();
      setNotificationsCount(0);
      setNotifications(notifications.map((n: any) => ({ ...n, read: true })));
      setNotifDropdownOpen(false);
    } catch (err) {
      console.error('Error al marcar notificaciones como leídas:', err);
    }
  };

  return (
    <header className="flex justify-between items-center h-16 px-6 w-full z-40 bg-[#0f172a] border-b border-slate-800 sticky top-0 text-white transition-colors duration-150">
      
      {/* Logotipo y menú en móviles */}
      <div className="flex items-center md:hidden gap-3">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
          title="Alternar Menú de Navegación"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-serif text-2xl font-bold text-white">
          {clinicName}
        </span>
      </div>

      {/* Barra de búsqueda para escritorio */}
      <div className="hidden md:flex items-center relative w-96">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input 
          id="global-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/60 rounded-full font-sans text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
          placeholder={getSearchPlaceholder()}
          type="text"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            title="Limpiar Búsqueda"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Acciones del Encabezado */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Selector Global de Paciente */}
        <div className="flex items-center gap-2 border-r border-slate-850 pr-2 md:pr-4">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 hidden lg:inline">Paciente Activo:</span>
          <select 
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="border border-slate-700 rounded-lg py-1 px-2 bg-slate-850 text-white font-sans text-xs outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all cursor-pointer"
            title="Seleccionar paciente activo"
          >
            {patients.length === 0 ? (
              <option value="">Sin pacientes</option>
            ) : (
              patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            )}
          </select>
        </div>

        {/* Botón de Asistente de IA */}
        <button 
          id="btn-ai-assistant-header"
          onClick={onTriggerAIAssistant}
          className="flex items-center gap-1.5 text-xs font-sans font-bold text-slate-200 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-full transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-700 dark:text-slate-300 fill-amber-300/40" />
          <span className="hidden sm:inline">Asistente de IA</span>
        </button>



        {/* Campana de Notificaciones y Dropdown */}
        <div className="relative">
          <button 
            id="btn-bell-notifications"
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors relative cursor-pointer"
            title="Ver Alertas"
          >
            <Bell className="w-5 h-5" />
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-bounce"></span>
            )}
          </button>

          {/* Menú desplegable de Alertas */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-[#c4c7c8]/40 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-sky-100/10 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex justify-between items-center">
                <span className="text-xs font-bold text-[#181c1e] dark:text-white uppercase tracking-wider">Alertas Clínicas</span>
                {notificationsCount > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold hover:underline cursor-pointer"
                  >
                    Descartar todas
                  </button>
                )}
              </div>
              <div className="divide-y divide-[#ebeef0] dark:divide-slate-700 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No hay notificaciones activas.
                  </div>
                ) : (
                  notifications.map((n: any) => {
                    const handleNotificationClick = () => {
                      setNotifDropdownOpen(false);
                      const titleLower = n.title.toLowerCase();
                      const descLower = n.desc.toLowerCase();
                      if (titleLower.includes('ficha') || titleLower.includes('paciente') || descLower.includes('expediente')) {
                        setCurrentTab('odontogram');
                      } else if (titleLower.includes('cita') || titleLower.includes('reserva') || titleLower.includes('programada')) {
                        setCurrentTab('calendar');
                      } else if (titleLower.includes('presupuesto')) {
                        setCurrentTab('presupuestos');
                      } else {
                        setCurrentTab('dashboard');
                      }
                    };

                    return (
                      <button 
                        key={n.id} 
                        onClick={handleNotificationClick}
                        className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors block cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <p className={`text-xs font-semibold text-[#181c1e] dark:text-white flex items-center gap-1 ${!n.read ? 'text-slate-950 dark:text-slate-100 font-bold' : ''}`}>
                            {!n.read && <span className="w-1.5 h-1.5 bg-slate-900 dark:bg-slate-100 rounded-full shrink-0"></span>}
                            {n.title}
                          </p>
                          <span className="text-[9px] text-[#444748] dark:text-slate-400 font-medium shrink-0 ml-1">{n.time}</span>
                        </div>
                        <p className="text-2xs text-[#444748] dark:text-slate-355 mt-1">{n.desc}</p>
                      </button>
                    );
                  })
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-2 border-t border-[#ebeef0] dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-center">
                  <button 
                    onClick={() => { setNotifDropdownOpen(false); setCurrentTab('notifications'); }}
                    className="text-[11px] text-slate-900 dark:text-slate-100 font-bold hover:underline cursor-pointer"
                  >
                    Ver todas las alertas
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acceso rápido a Chats */}
        <button 
          id="btn-shortcut-chats"
          onClick={() => setCurrentTab('dashboard')}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          title="Abrir Centro de Mensajes"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Avatar móvil para ajustes */}
        <div 
          onClick={() => setCurrentTab('settings')}
          className="md:hidden w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700 cursor-pointer"
          title="Configuración Clínica"
        >
          <img 
            alt="Perfil Clínico" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDmFXzZq52qoTlQc218FERZUoTdyjfwW6fLZjzzPKsAzaIEs-mB0T6ZX5MJk66uCCRUmkOMdvzSPpqpbo-qHCYOnR8SPsxpZmCkHf_Uj2VLYFNaflOdk6RtAiZQcoOo7twu26C4b-jGrIwrjuq4J9WYIl-aJNtoIWAHILZUXbSaAAHkwW99wmqdzsYgwxksdx5HZKDQmVttvOK77BbwRrncuiRHW4ExUVMhyZFtjhhyhoAz4hK8qyIhqgCnqrxuJkae708GHPtN4H5"
          />
        </div>
      </div>
    </header>
  );
}
