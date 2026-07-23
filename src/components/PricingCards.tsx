import React from 'react';
import { ArrowLeft, Check, Sparkles, Phone, HelpCircle } from 'lucide-react';
import { ClinicConfig } from '../data/clinics';

interface PricingCardsProps {
  config: ClinicConfig;
  onNavigate: (path: string) => void;
}

export default function PricingCards({ config, onNavigate }: PricingCardsProps) {
  const primaryBgStyle = { backgroundColor: config.primaryColor };
  const primaryTextStyle = { color: config.primaryColor };
  const primaryBorderColorStyle = { borderColor: config.primaryColor };

  const packages = [
    {
      name: 'Dental Presencia Pro',
      subtitle: 'Ideal para iniciar tu marca dental local',
      price: '$8,500',
      priceMax: '$12,500',
      description: 'Landing page premium optimizada para médicos independientes.',
      features: [
        'Landing Page profesional con diseño responsive',
        'Sección de servicios y catálogo de tratamientos',
        'Botones dinámicos de llamada y chat de WhatsApp',
        'Ubicación física mapeada e información de horarios',
        'Módulo de opiniones y reseñas de confianza',
        'Formulario básico de contacto y valoración'
      ],
      isRecommended: false
    },
    {
      name: 'Dental Captación + Agenda',
      subtitle: 'Nuestra solución más vendida para consultorios',
      price: '$14,500',
      priceMax: '$19,500',
      description: 'Sistema completo de prospección y seguimiento de pacientes.',
      features: [
        'Todo lo incluido en Presencia Pro',
        'Formulario móvil inteligente de valoración estética',
        'Respuestas de WhatsApp dinámicas y personalizadas',
        'Código QR personalizado para captación en consultorio',
        'Módulo CRM ligero integrado para el control de prospectos',
        'Estados de seguimiento simples (Nuevo, Contactado, etc.)'
      ],
      isRecommended: true
    },
    {
      name: 'Dental Clínica Pro',
      subtitle: 'La suite completa para clínicas de alta demanda',
      price: '$20,000',
      priceMax: '$28,000',
      description: 'El control absoluto del flujo de pacientes de tu clínica.',
      features: [
        'Todo lo incluido en Captación + Agenda',
        'Dashboard administrativo completo (Bento KPIs)',
        'Pipeline de pacientes interactivo tipo tablero Kanban',
        'Agenda digital avanzada y multi-doctor',
        'Centro de plantillas y gestión de mensajes de WhatsApp',
        'Panel de reportes de conversión y descargas',
        'Módulo de configuración y personalización del branding'
      ],
      isRecommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-35">
        <button 
          onClick={() => onNavigate('/')} 
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Inicio
        </button>
        <span className="font-bold text-sm text-slate-900 tracking-tight">Propuesta de Implementación</span>
        <div className="w-12"></div> {/* Spacer */}
      </header>

      {/* Hero */}
      <div className="text-center py-12 px-4 space-y-3 bg-gradient-to-b from-white to-slate-50">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Implementación Única · Sin Rentas Mensuales Forzosas
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Soluciones ASCK Dental Core
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Invierte en tecnología propia adaptada a tu marca. Escoge el nivel de implementación que requiere tu consultorio hoy.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {packages.map((pkg, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl border transition-all flex flex-col justify-between relative shadow-xs p-6 md:p-8 ${
                pkg.isRecommended 
                  ? 'border-blue-600 dark:border-teal-500 shadow-lg scale-102 lg:scale-103 z-10' 
                  : 'border-slate-200'
              }`}
            >
              {pkg.isRecommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider py-1 px-3.5 rounded-full shadow-xs flex items-center gap-1" style={primaryBgStyle}>
                  Recomendado
                </span>
              )}

              <div className="space-y-6">
                {/* Header Card */}
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{pkg.name}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold">{pkg.subtitle}</p>
                </div>

                {/* Price */}
                <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Implementación</span>
                  <div className="space-y-0.5">
                    <span className="text-2xl md:text-3xl font-extrabold text-slate-900">{pkg.price}</span>
                    <span className="text-xs text-slate-400 font-medium"> a {pkg.priceMax} MXN</span>
                    <span className="text-[10px] text-slate-400 block font-normal">(Proyecto llave en mano)</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Incluye:</span>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-8 mt-8 border-t border-slate-100 space-y-3">
                <a 
                  href={`https://wa.me/${config.whatsAppNumber.replace(/\+/g, '')}?text=Hola,%20me%20interesa%20el%20paquete%20${encodeURIComponent(pkg.name)}%20para%20mi%20clinica.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl cursor-pointer transition-all shadow-xs border"
                  style={pkg.isRecommended ? { ...primaryBgStyle, color: '#ffffff', borderColor: 'transparent' } : { backgroundColor: '#ffffff', color: '#1e293b', borderColor: '#cbd5e1' }}
                >
                  Cotizar Proyecto
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance Box */}
        <div className="max-w-3xl mx-auto mt-16 bg-slate-100 border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between text-slate-700">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Servicio Opcional</span>
            <h4 className="font-bold text-slate-900 text-sm flex items-center justify-center sm:justify-start gap-1.5">
              Mantenimiento Mensual de Servidor
              <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" title="Soporte técnico, respaldos y actualizaciones" />
            </h4>
            <p className="text-xs text-slate-550 leading-relaxed max-w-md font-semibold">
              Actualizaciones periódicas, respaldos locales encriptados automáticos, soporte por fallas y hospedaje web seguro.
            </p>
          </div>
          <div className="text-center sm:text-right shrink-0 bg-white border border-slate-200 p-4 rounded-xl min-w-[180px] shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Soporte Completo</span>
            <span className="text-lg font-extrabold text-slate-900">$1,500 a $3,000</span>
            <span className="text-xs text-slate-400 block font-bold">MXN / mes</span>
          </div>
        </div>

        {/* Legal Notes */}
        <div className="max-w-2xl mx-auto mt-12 text-center text-slate-400 text-[10px] leading-relaxed italic space-y-1">
          <p>* Los precios definitivos se confirman tras la valoración del volumen de doctores e histórico de pacientes a migrar.</p>
          <p>* El mantenimiento mensual es totalmente opcional. El código y base de datos son de tu propiedad.</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-400 text-[10px] bg-white border-t border-slate-200">
        © {new Date().getFullYear()} {config.name} · Huixquilucan, Edo. Méx.
      </footer>
    </div>
  );
}
