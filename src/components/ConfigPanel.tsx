import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Save, 
  RefreshCw, 
  Eye, 
  Palette, 
  Smartphone, 
  MapPin, 
  Clock,
  ShieldAlert,
  Info
} from 'lucide-react';
import { clinics, ClinicConfig } from '../data/clinics';

interface ConfigPanelProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export default function ConfigPanel({ showToast }: ConfigPanelProps) {
  const [selectedClinicId, setSelectedClinicId] = useState<string>(() => {
    return localStorage.getItem('asck_active_clinic') || clinics[0].id;
  });

  const [clinicName, setClinicName] = useState('');
  const [tagline, setTagline] = useState('');
  const [logoText, setLogoText] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [whatsAppNum, setWhatsAppNum] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');

  // Load clinic config whenever selection changes
  useEffect(() => {
    const savedCustomConfigs = localStorage.getItem('asck_custom_clinics');
    let clinicList = clinics;
    if (savedCustomConfigs) {
      clinicList = JSON.parse(savedCustomConfigs);
    }
    
    const active = clinicList.find(c => c.id === selectedClinicId) || clinics[0];
    setClinicName(active.name);
    setTagline(active.tagline);
    setLogoText(active.logoText);
    setPrimaryColor(active.primaryColor);
    setAccentColor(active.accentColor);
    setWhatsAppNum(active.whatsAppNumber);
    setAddress(active.address);
    setHours(active.hours);
    
    localStorage.setItem('asck_active_clinic', selectedClinicId);
  }, [selectedClinicId]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Retrieve custom configs or initialize
    const savedCustomConfigs = localStorage.getItem('asck_custom_clinics');
    let clinicList = [...clinics];
    if (savedCustomConfigs) {
      clinicList = JSON.parse(savedCustomConfigs);
    }

    // Update active clinic in list
    const updatedList = clinicList.map(c => {
      if (c.id === selectedClinicId) {
        return {
          ...c,
          name: clinicName,
          tagline,
          logoText,
          primaryColor,
          accentColor,
          whatsAppNumber: whatsAppNum,
          address,
          hours
        };
      }
      return c;
    });

    localStorage.setItem('asck_custom_clinics', JSON.stringify(updatedList));
    localStorage.setItem('asck_active_clinic', selectedClinicId);
    
    // Trigger global storage update event to sync other views
    window.dispatchEvent(new Event('storage'));
    
    showToast('¡Configuración de clínica guardada correctamente!', 'success');
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Deseas restaurar los valores por defecto de fábrica de esta clínica?')) {
      const original = clinics.find(c => c.id === selectedClinicId) || clinics[0];
      setClinicName(original.name);
      setTagline(original.tagline);
      setLogoText(original.logoText);
      setPrimaryColor(original.primaryColor);
      setAccentColor(original.accentColor);
      setWhatsAppNum(original.whatsAppNumber);
      setAddress(original.address);
      setHours(original.hours);

      // Clean storage entry
      const savedCustomConfigs = localStorage.getItem('asck_custom_clinics');
      if (savedCustomConfigs) {
        const list = JSON.parse(savedCustomConfigs) as ClinicConfig[];
        const filtered = list.filter(c => c.id !== selectedClinicId);
        localStorage.setItem('asck_custom_clinics', JSON.stringify(filtered));
      }
      
      window.dispatchEvent(new Event('storage'));
      showToast('Configuraciones restauradas por defecto.', 'info');
    }
  };

  return (
    <div id="config-panel-root" className="p-6 flex flex-col h-full bg-slate-50 dark:bg-slate-950 font-sans text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-5 gap-4 shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-2xl md:text-3xl tracking-tight">
            Configuración y Personalización
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Ajusta los valores de marca, colores y datos comerciales para personalizar la demo de ASCK Dental Core.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 h-[calc(100vh-210px)] overflow-hidden">
        
        {/* Columna 1: Formulario */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between max-h-full overflow-y-auto space-y-5">
          <form onSubmit={handleSaveConfig} className="space-y-4 font-semibold text-slate-700 dark:text-slate-200">
            


            {/* Identidad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1">Nombre Clínico</label>
                <input 
                  type="text" 
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1">Eslogan</label>
                <input 
                  type="text" 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
            </div>

            {/* Logo y WhatsApp */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1">Texto del Logo</label>
                <input 
                  type="text" 
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1">WhatsApp (+52 55 XXXX XXXX)</label>
                <input 
                  type="text" 
                  value={whatsAppNum}
                  onChange={(e) => setWhatsAppNum(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
            </div>

            {/* Colores */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" /> Color Primario (Hex)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                  />
                  <input 
                    type="text" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white uppercase" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" /> Color Acento (Hex)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                  />
                  <input 
                    type="text" 
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white uppercase" 
                  />
                </div>
              </div>
            </div>

            {/* Ubicación y Horarios */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Dirección Física (MX)
                </label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Horarios de Atención
                </label>
                <input 
                  type="text" 
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50/40 dark:bg-slate-950 dark:text-white" 
                />
              </div>
            </div>

            {/* Safe Notice */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-150/80 dark:border-blue-900/50 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed text-blue-600 dark:text-blue-300">
              <Info className="w-4 h-4 shrink-0 text-blue-500" />
              <span>
                Esta configuración es referencial. Los cambios modifican el estado de la landing pública de demostración que verá el paciente al cambiar a la vista previa.
              </span>
            </div>

          </form>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
            <button 
              type="button" 
              onClick={handleResetDefaults}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restaurar
            </button>
            <button 
              type="button" 
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-[#00346f] hover:bg-[#002652] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1"
              style={{ backgroundColor: primaryColor }}
            >
              <Save className="w-3.5 h-3.5" />
              Guardar Configuración
            </button>
          </div>
        </div>

        {/* Columna 2: Mini-landing preview */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between max-h-full overflow-y-auto">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Eye className="w-4 h-4 text-slate-450" /> Previsualización de Paciente
            </span>

            {/* Mock Landing Page Card */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col bg-slate-50 dark:bg-slate-950">
              {/* Mini Nav */}
              <div className="bg-white dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-white font-bold text-[10px]" style={{ backgroundColor: primaryColor }}>
                    {logoText[0] || 'D'}
                  </div>
                  <span className="font-bold text-[9px] text-slate-900 dark:text-white truncate max-w-[80px]">{clinicName}</span>
                </div>
                <span className="bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 font-bold text-[8px] px-1.5 py-0.5 rounded-full border border-teal-100 dark:border-teal-900/40 uppercase">
                  Página Activa
                </span>
              </div>

              {/* Mini Hero */}
              <div className="p-4 bg-white dark:bg-slate-900 space-y-2 border-b border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-950 dark:text-white text-sm leading-tight">
                  {clinicName}
                </h4>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 italic leading-snug">
                  "{tagline}"
                </p>
                <div className="pt-2 flex gap-2">
                  <span className="h-6 px-3 rounded bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    Agendar Valoración
                  </span>
                  <span className="h-6 px-3 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[8px] flex items-center justify-center bg-white dark:bg-slate-800">
                    WhatsApp
                  </span>
                </div>
              </div>

              {/* Mini Footer */}
              <div className="p-3 bg-slate-900 dark:bg-slate-950 text-slate-400 text-[8px] space-y-1.5 text-left border-t border-slate-800">
                <p className="text-white font-bold">{clinicName}</p>
                <div className="space-y-1 text-slate-500 dark:text-slate-400 leading-normal">
                  <p>📍 {address}</p>
                  <p>📞 {whatsAppNum}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
