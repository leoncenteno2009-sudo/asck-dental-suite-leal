import React, { useState } from 'react';
import { ClinicConfig } from '../data/clinics';
import { 
  ArrowLeft, 
  Send, 
  MessageSquareCode, 
  ShieldAlert, 
  CalendarDays, 
  AlertTriangle, 
  Smile, 
  User 
} from 'lucide-react';

interface ValuationFormProps {
  config: ClinicConfig;
  initialTreatment?: string;
  onNavigate: (path: string) => void;
  onSubmitLead: (leadData: {
    name: string;
    lastName: string;
    phone: string;
    treatment: string;
    urgency: 'Baja' | 'Media' | 'Alta';
    dateTentative: string;
    message: string;
  }) => void;
}

export default function ValuationForm({ config, initialTreatment, onNavigate, onSubmitLead }: ValuationFormProps) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState(initialTreatment || config.treatments[0]?.name || '');
  const [urgency, setUrgency] = useState<'Baja' | 'Media' | 'Alta'>('Media');
  const [dateTentative, setDateTentative] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onSubmitLead({
        name,
        lastName,
        phone,
        treatment,
        urgency,
        dateTentative,
        message
      });
      setSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const getWhatsAppLink = () => {
    const fullName = `${name} ${lastName}`.trim();
    const textMsg = `Hola, soy ${fullName}. Me interesa una valoración para ${treatment}. Mi WhatsApp es ${phone}. ${message ? `Detalle: ${message}` : ''}`;
    return `https://wa.me/${config.whatsAppNumber.replace(/\+/g, '')}?text=${encodeURIComponent(textMsg)}`;
  };

  const primaryBgStyle = { backgroundColor: config.primaryColor };
  const primaryTextStyle = { color: config.primaryColor };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-100">
      
      {/* Header Formulario */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
        <button 
          onClick={() => onNavigate('/')} 
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <span className="font-bold text-sm text-slate-900 tracking-tight">{config.name}</span>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 md:p-6 flex flex-col justify-center">
        
        {!isSuccess ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="text-center space-y-1.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Formulario de Valoración</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Completa este formulario inteligente para agendar tu consulta y coordinar tu valoración.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> Nombre
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ana"
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    Apellido
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej. Gómez"
                    className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Número de WhatsApp</label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. +52 55 1234 5678"
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                />
              </div>

              {/* Tratamiento */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tratamiento de Interés</label>
                <select 
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 cursor-pointer"
                >
                  {config.treatments.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Urgencia / Dolor */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nivel de Urgencia / Dolor</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['Baja', 'Media', 'Alta'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`py-2 px-3 rounded-lg border font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                        urgency === level 
                          ? 'border-blue-600 bg-blue-50/40 text-blue-600'
                          : 'border-slate-200 bg-white text-slate-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fecha Tentativa */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" /> Fecha Tentativa de Visita
                </label>
                <input 
                  type="date" 
                  value={dateTentative}
                  onChange={(e) => setDateTentative(e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50 cursor-pointer" 
                />
              </div>

              {/* Mensaje Adicional */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mensaje o Síntomas</label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Coméntanos brevemente qué te gustaría tratar..."
                  className="w-full text-xs font-semibold rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50" 
                />
              </div>

              {/* Nota de Seguridad */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed text-blue-600 font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Tus datos se usarán únicamente para contactarte sobre tu valoración.</span>
              </div>

              {/* Botón de Enviar */}
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                style={primaryBgStyle}
              >
                {submitting ? 'Registrando...' : (
                  <>
                    Solicitar Valoración
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
              <Smile className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">¡Solicitud Registrada!</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Tu solicitud de valoración para **{treatment}** ha sido recibida en la red local de la clínica.
              </p>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl text-left space-y-3 font-semibold text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 text-[10px] uppercase">Paciente</span>
                <span className="text-slate-900">{name} {lastName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 text-[10px] uppercase">Tratamiento</span>
                <span className="text-slate-900">{treatment}</span>
              </div>
              {dateTentative && (
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] uppercase">Fecha Propuesta</span>
                  <span className="text-slate-900">{dateTentative}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-slate-450 leading-relaxed">
                Para acelerar tu diagnóstico y confirmar horarios, por favor presiona el botón de abajo para enviar los detalles directamente a nuestro canal de WhatsApp.
              </p>
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider cursor-pointer text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquareCode className="w-5 h-5" />
                Continuar por WhatsApp
              </a>
              <button 
                onClick={() => onNavigate('/')}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 underline block mx-auto pt-2 cursor-pointer"
              >
                Volver a la Página de Inicio
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer Fijo */}
      <footer className="p-4 text-center text-slate-400 text-[10px] bg-white border-t border-slate-200">
        © {new Date().getFullYear()} {config.name} · Huixquilucan, Edo. Méx.
      </footer>
    </div>
  );
}
