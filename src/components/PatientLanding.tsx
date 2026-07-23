import React from 'react';
import { ClinicConfig } from '../data/clinics';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  ExternalLink 
} from 'lucide-react';

interface PatientLandingProps {
  config: ClinicConfig;
  onNavigate: (path: string) => void;
  onSelectTreatment: (treatmentName: string) => void;
}

export default function PatientLanding({ config, onNavigate, onSelectTreatment }: PatientLandingProps) {
  const primaryBgStyle = { backgroundColor: config.primaryColor };
  const primaryTextStyle = { color: config.primaryColor };
  const accentBgStyle = { backgroundColor: config.accentColor };
  const accentBorderColorStyle = { borderColor: config.accentColor };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navbar Pública */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={primaryBgStyle}>
            {config.logoText[0]}
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">{config.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#tratamientos" className="hover:text-teal-600 transition-colors text-slate-600">Tratamientos</a>
          <a href="#nosotros" className="hover:text-teal-600 transition-colors text-slate-600">Nosotros</a>
          <a href="#testimonios" className="hover:text-teal-600 transition-colors text-slate-600">Opiniones</a>
          <button 
            onClick={() => onNavigate('/planes')} 
            className="hover:text-teal-600 transition-colors text-slate-600 cursor-pointer"
          >
            Paquetes
          </button>
          <button 
            onClick={() => onNavigate('/admin')} 
            className="text-slate-900 hover:text-slate-600 font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            Portal CRM <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('/valoracion')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Valoración Gratis
          </button>
          <a 
            href={`https://wa.me/${config.whatsAppNumber.replace(/\+/g, '')}?text=Hola,%20me%20interesa%20una%20cruzada%20de%20valoracion.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2 rounded-lg flex items-center justify-center transition-colors shadow-xs"
            title="WhatsApp de la clínica"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              Consulta e Diagnóstico Profesional
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                onClick={() => onNavigate('/valoracion')}
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-bold py-3.5 px-8 rounded-xl cursor-pointer text-sm shadow-md transition-all flex items-center justify-center gap-2 group active:scale-98"
                style={primaryBgStyle}
              >
                Agendar Mi Valoración
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a 
                href={`https://wa.me/${config.whatsAppNumber.replace(/\+/g, '')}?text=Hola,%20me%20gustaría%20agendar%20una%20cita.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-8 rounded-xl border border-slate-200/80 shadow-xs text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Escribir por WhatsApp
              </a>
            </div>
            {/* Etiquetas de datos por confirmar */}
            <p className="text-[10px] text-slate-400 italic">
              * Tratamientos sujetos a valoración. Dirección y horarios de servicio por confirmar.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Visual Card Decorator */}
            <div className="relative mx-auto max-w-xs md:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Prospecto Dental</span>
                  <h3 className="font-bold text-slate-900 text-lg">{config.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-semibold text-slate-700">Mapeado de Diagnóstico</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-slate-700">Planes desde $8,500 MXN</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Tecnología de punta</span>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Demo Conceptual</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Tratamientos */}
      <section id="tratamientos" className="py-16 md:py-24 bg-white border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Tratamientos a tu Medida</h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Haz clic en cualquier tratamiento para pre-agendar tu valoración gratuita de inmediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.treatments.map((t) => (
              <div 
                key={t.id}
                onClick={() => {
                  onSelectTreatment(t.name);
                  onNavigate('/valoracion');
                }}
                className="bg-slate-50 hover:bg-slate-100/80 hover:scale-101 border border-slate-200/80 rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs border border-slate-100" style={primaryTextStyle}>
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-teal-600 transition-colors">{t.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200/60 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Desde</span>
                  <span className="text-xs font-bold text-slate-900">{t.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros / Doctores */}
      <section id="nosotros" className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Nuestro Equipo Médico</h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Contamos con especialistas de alta reputación académica y calidez humana dedicados a transformar tu sonrisa con las mejores prácticas éticas e higiénicas.
            </p>
            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">✓</div>
                <span>Especialistas certificados en Ortodoncia y Cirugía</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">✓</div>
                <span>Materiales de grado clínico premium</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {config.doctors.map((doc, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 border border-slate-200 font-bold text-xl">
                  {doc.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-950 text-sm">{doc}</h4>
                  <span className="text-xs text-teal-600 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-full inline-block">Cirujano Dentista</span>
                </div>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Comprometido con darte un diagnóstico seguro y libre de dolor.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-16 md:py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Opiniones de Pacientes</h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              La confianza de nuestros pacientes es nuestro mayor orgullo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {config.reviews.map((r, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic">
                  "{r.text}"
                </p>
                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                    {r.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{r.author}</h4>
                    <span className="text-[10px] text-slate-400">Paciente verificado</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contacto */}
      <footer className="bg-slate-900 text-slate-400 py-16 font-sans text-xs">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-md" style={primaryBgStyle}>
                {config.logoText[0]}
              </div>
              <span className="font-bold text-md tracking-tight text-white">{config.name}</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              {config.tagline}. Soluciones odontológicas confiables, limpias y profesionales.
            </p>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Contacto e Información</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{config.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{config.whatsAppNumber}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{config.hours}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Enlaces Administrativos</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('/admin')}
                  className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Acceso Administrativo
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <div className="text-[10px] text-slate-500 leading-relaxed">
                  Sistema de mapeo clínico y CRM en red local.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px]">
          <span>© {new Date().getFullYear()} {config.name}. Todos los derechos reservados.</span>
          <span>Información referencial para propósitos de demostración.</span>
        </div>
      </footer>
    </div>
  );
}
