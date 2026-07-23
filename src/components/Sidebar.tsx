import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Settings, 
  HelpCircle, 
  Bell, 
  Plus,
  LogOut,
  Stethoscope,
  Folder,
  ExternalLink
} from 'lucide-react';
import { clinics } from '../config/clinic.config';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAppointmentModal: () => void;
  onOpenPatientModal: () => void;
  onLogout?: () => void;
  clinicName?: string;
  clinicTagline?: string;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenAppointmentModal, 
  onOpenPatientModal, 
  onLogout,
  clinicName = 'Clínica Dental',
  clinicTagline = 'Excelencia Clínica'
}: SidebarProps) {

  // Estructura de navegación traducida
  const navItems = [
    { id: 'dashboard', label: 'Panel Control', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Tablero CRM', icon: Users },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'archivero', label: 'Archivero', icon: Folder },
    { id: 'appointments', label: 'Citas', icon: Calendar },
    { id: 'presupuestos', label: 'Presupuestos', icon: FileText },
    { id: 'radiology', label: 'Radiología', icon: Activity },
    { id: 'configuracion', label: 'Configuración Marca', icon: Settings },
    { id: 'settings', label: 'Configuración Clínica', icon: Settings },
    { id: 'support', label: 'Soporte Técnico', icon: HelpCircle },
  ];

  // Metadatos de perfil clínico traducidos y actualizados dinámicamente
  const getProfile = () => {
    const mainDoctorName = clinics[0]?.doctors[0] || 'Dr. Juan Carlos';
    if (currentTab === 'odontogram' || currentTab === 'patients') {
      return {
        name: mainDoctorName,
        role: 'Director Clínico',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAszXuFy1xB42lWd4FL4Js326XUsuLh1JD8tlmzIhhBJH6L6E9g2TP9JH8m3kjUchgvZ4E-seKzO2oH_bBdrYZpXe7x64SRd5d4ZC4SdhyWKwxHd4tTofavR2HyQCYR-tLA0Z-jIwF8cW2jHqxlsTZoAc-vaXnthl4Rk0RNUhXV6mDs_ZHlz35F74dULM998FO5TRmeePUe7ILG2i_3fMVMKmXJobskRgPQC4S_hzmc46rAENzE44QGk--m0ANIj1dG8brMAGqtHlxH'
      };
    } else if (currentTab === 'presupuestos') {
      return {
        name: clinics[0]?.doctors[1] || 'Dra. Sara Gómez',
        role: 'Especialista en Ortodoncia',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmFXzZq52qoTlQc218FERZUoTdyjfwW6fLZjzzPKsAzaIEs-mB0T6ZX5MJk66uCCRUmkOMdvzSPpqpbo-qHCYOnR8SPsxpZmCkHf_Uj2VLYFNaflOdk6RtAiZQcoOo7twu26C4b-jGrIwrjuq4J9WYIl-aJNtoIWAHILZUXbSaAAHkwW99wmqdzsYgwxksdx5HZKDQmVttvOK77BbwRrncuiRHW4ExUVMhyZFtjhhyhoAz4hK8qyIhqgCnqrxuJkae708GHPtN4H5'
      };
    } else {
      return {
        name: mainDoctorName,
        role: 'Director Médico Administrador',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9qY-Yo00VAQICr4JJ8sjr3bcyW73OqlAdbBL9K4aJ_-wBiYeiysx1fXFCtu99EFQa6EpLb2qGz4s5SfjPUA6ZTbjTSL-Akpy6FN6Nt4hFvkGbnaEwGlVPKjFgm3AWpZOTFQjguy3fRw0SgjZSPVX2W05e7En8MD6QtvEp7m7TzcBTx5onCAnTOYoK_Y-_cqzgQl7DvHnbdGPKzFJiYU8UklBZbmdBYGUYHteTQBNG4dxOaOgY4ndRj5h8ZqjWErnu8F-O0TgNPwRQ'
      };
    }
  };

  const activeProfile = getProfile();

  return (
    <aside 
      id="main-sidebar"
      className="hidden md:flex flex-col h-screen w-[280px] shrink-0 border-r border-slate-800 bg-[#0f172a] text-slate-200 py-6 px-4 sticky top-0 left-0 z-30 transition-colors duration-300"
    >
      {/* Logo y Encabezado de Marca (Horizontal) */}
      <div className="mb-6 flex flex-row items-center gap-3 px-2 w-full justify-start">
        <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-3xs">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
            {clinicName}
          </h1>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-450 mt-1.5 leading-none">
            {clinicTagline}
          </p>
        </div>
      </div>

      {/* Acciones Principales */}
      <div className="flex flex-col gap-2 mb-6">
        <button 
          id="btn-sidebar-new-appt"
          onClick={onOpenAppointmentModal}
          className="w-full bg-white hover:bg-slate-100 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transform active:scale-98 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nueva Cita
        </button>
        <button 
          id="btn-sidebar-new-patient"
          onClick={onOpenPatientModal}
          className="w-full bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transform active:scale-98 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nuevo Paciente
        </button>
      </div>

      {/* Enlaces de Navegación Principal */}
      <nav id="sidebar-nav" className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-left group ${
                isActive 
                  ? 'bg-slate-800 text-white font-bold border-r-4 border-white' 
                  : 'text-slate-400 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? 'stroke-[2.5] text-white' : 'text-slate-500'
                }`} />
                <span className="font-sans text-sm tracking-wide">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Botón de Retorno a Web Pública */}
      <div className="px-1 mb-4 shrink-0">
        <button
          onClick={() => {
            window.history.pushState(null, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-850 hover:text-white transition-all duration-200 cursor-pointer text-left font-sans text-xs font-bold border border-dashed border-slate-700 shadow-3xs"
        >
          <ExternalLink className="w-4 h-4 text-slate-500" />
          <span>Ver Web Pública</span>
        </button>
      </div>

      {/* Tarjeta de Información del Médico y Logout */}
      <div id="sidebar-bottom-section" className="mt-auto pt-4 border-t border-slate-800 shrink-0">
        <div id="sidebar-profile-card" className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              alt="Avatar del Médico" 
              src={activeProfile.avatar}
              className="w-9 h-9 rounded-full object-cover border border-slate-750 bg-slate-800 placeholder-avatar shadow-xs" 
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white truncate">
                {activeProfile.name}
              </span>
              <span className="text-[10px] text-slate-450 font-medium truncate">
                {activeProfile.role}
              </span>
            </div>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-850 cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
