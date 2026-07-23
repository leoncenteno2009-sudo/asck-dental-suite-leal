export interface ClinicConfig {
  id: string;
  name: string;
  tagline: string;
  logoText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  whatsAppNumber: string;
  address: string;
  hours: string;
  doctors: string[];
  treatments: {
    id: string;
    name: string;
    description: string;
    priceRange: string;
    duration: string;
  }[];
  reviews: {
    author: string;
    stars: number;
    text: string;
  }[];
  heroTitle: string;
  heroSubtitle: string;
}

const allClinics: ClinicConfig[] = [
  {
    id: 'caxnajoy',
    name: 'Dr. Enrique Caxnajoy',
    tagline: 'Tu Sonrisa en Manos de un Experto',
    logoText: 'Dr. Caxnajoy',
    primaryColor: '#181c1e', // Sleek Neutral Black
    secondaryColor: '#f8fafc',
    accentColor: '#64748b', // Slate accent
    whatsAppNumber: '+525512345678',
    address: 'Edificio MÃ©dico Lomas, Huixquilucan, Edo. MÃ©x. (DirecciÃ³n por confirmar)',
    hours: 'Lunes a Viernes: 9:00 AM - 7:00 PM Â· SÃ¡bado: 9:00 AM - 2:00 PM (Horario por confirmar)',
    doctors: ['Dr. Enrique Caxnajoy'],
    treatments: [
      { id: 'limpieza', name: 'Limpieza Dental Ultrasonido', description: 'EliminaciÃ³n profunda de sarro y pulido dental para una higiene Ã³ptima.', priceRange: '$600 - $1,200 MXN', duration: '45 min' },
      { id: 'ortodoncia', name: 'ValoraciÃ³n de Ortodoncia', description: 'Estudio preliminar para alineaciÃ³n dental mediante brackets o alineadores transparentes.', priceRange: '$800 - $1,500 MXN', duration: '60 min' },
      { id: 'sonrisa', name: 'DiseÃ±o de Sonrisa Express', description: 'EvaluaciÃ³n estÃ©tica personalizada para carillas de resina o porcelana.', priceRange: 'Sujeto a valoraciÃ³n', duration: '45 min' },
      { id: 'general', name: 'Consulta General y DiagnÃ³stico', description: 'RevisiÃ³n completa de salud oral con cÃ¡mara intraoral y radiografÃ­a diagnÃ³stica.', priceRange: '$500 - $900 MXN', duration: '30 min' }
    ],
    reviews: [
      { author: 'Mariana GÃ³mez', stars: 5, text: 'Excelente atenciÃ³n del Dr. Enrique. Explica todo con mucha paciencia y profesionalismo.' },
      { author: 'Roberto SÃ¡nchez', stars: 5, text: 'Instalaciones muy limpias y la valoraciÃ³n fue muy clara. Definitivamente volverÃ©.' }
    ],
    heroTitle: 'Salud y estÃ©tica dental con precisiÃ³n profesional',
    heroSubtitle: 'Agenda hoy tu consulta de valoraciÃ³n en Huixquilucan y da el primer paso hacia la sonrisa que mereces.'
  },
  {
    id: 'advance',
    name: 'ClÃ­nica Dental Advance',
    tagline: 'TecnologÃ­a y PrecisiÃ³n para tu Salud Dental',
    logoText: 'Dental Advance',
    primaryColor: '#181c1e',
    secondaryColor: '#f8fafc',
    accentColor: '#64748b',
    whatsAppNumber: '+525587654321',
    address: 'Av. Central 45, Lomas del Sol, Huixquilucan, Estado de MÃ©xico (DirecciÃ³n por confirmar)',
    hours: 'Lunes a SÃ¡bado: 8:00 AM - 8:00 PM (Horario por confirmar)',
    doctors: ['Dr. PÃ©rez', 'Dra. GÃ³mez', 'Higiene 1'],
    treatments: [
      { id: 'implantes', name: 'Implantes Dentales', description: 'RestauraciÃ³n permanente de piezas dentales perdidas con titanio de alta calidad.', priceRange: '$12,000 - $22,000 MXN', duration: '90 min' },
      { id: 'ortodoncia-adv', name: 'Ortodoncia Invisible', description: 'AlineaciÃ³n moderna con guardas invisibles y cÃ³modas.', priceRange: '$18,000 - $35,000 MXN', duration: '60 min' },
      { id: 'limpieza-adv', name: 'Profilaxis Avanzada', description: 'RemociÃ³n de manchas y sarro con cepillado rotatorio y flÃºor protector.', priceRange: '$700 - $1,300 MXN', duration: '45 min' },
      { id: 'urgencias', name: 'AtenciÃ³n de Urgencia 24/7', description: 'Alivio inmediato del dolor, infecciones, fracturas o molestias agudas.', priceRange: 'Sujeto a valoraciÃ³n', duration: 'VarÃ­a' }
    ],
    reviews: [
      { author: 'Alejandro Ruiz', stars: 5, text: 'Me atendieron de urgencia por un dolor de muela insoportable. Rapidez y alivio total.' },
      { author: 'Gabriela Ortiz', stars: 5, text: 'Llevo mi tratamiento de ortodoncia invisible aquÃ­. Muy cÃ³modas y el personal es sÃºper atento.' }
    ],
    heroTitle: 'ClÃ­nica dental moderna con tecnologÃ­a de vanguardia',
    heroSubtitle: 'Especialistas en tratamientos avanzados de implantologÃ­a, ortodoncia invisible y estÃ©tica dental integral en Huixquilucan.'
  },
  {
    id: 'leal',
    name: 'Leal Dental / Dra. Leticia',
    tagline: 'Cuidado Premium para la Sonrisa de tu Familia',
    logoText: 'Leal Dental',
    primaryColor: '#181c1e',
    secondaryColor: '#f8fafc',
    accentColor: '#64748b',
    whatsAppNumber: '+525555551234',
    address: 'Camino a Palo Solo S/N, Huixquilucan, Edo. MÃ©x. (DirecciÃ³n por confirmar)',
    hours: 'Lunes a Viernes: 10:00 AM - 7:00 PM Â· SÃ¡bado: 10:00 AM - 3:00 PM (Horario por confirmar)',
    doctors: ['Dra. Leticia Leal', 'Dr. PÃ©rez'],
    treatments: [
      { id: 'carillas', name: 'Carillas de Porcelana Premium', description: 'Perfecciona la forma, color y alineaciÃ³n de tus dientes de manera definitiva.', priceRange: 'Sujeto a valoraciÃ³n estÃ©tica', duration: '120 min' },
      { id: 'blanqueamiento', name: 'Blanqueamiento LÃ¡ser ClÃ­nico', description: 'Aclara hasta 4 tonos en una sola sesiÃ³n segura para el esmalte.', priceRange: '$3,500 - $5,500 MXN', duration: '60 min' },
      { id: 'ortodoncia-premium', name: 'Ortodoncia EstÃ©tica CerÃ¡mica', description: 'Brackets estÃ©ticos casi imperceptibles con la mÃ¡xima eficacia de alineado.', priceRange: '$15,000 - $25,000 MXN', duration: '60 min' },
      { id: 'valoracion-premium', name: 'ValoraciÃ³n EstÃ©tica Integral', description: 'AnÃ¡lisis digital de sonrisa y plan de tratamiento personalizado premium.', priceRange: '$1,000 - $1,800 MXN', duration: '60 min' }
    ],
    reviews: [
      { author: 'LucÃ­a FernÃ¡ndez', stars: 5, text: 'El mejor trato y atenciÃ³n personalizada. Los detalles y la calidez de la Dra. Leticia marcan la diferencia.' },
      { author: 'Fernando Castro', stars: 5, text: 'Me hice carillas y blanqueamiento. El resultado superÃ³ por mucho mis expectativas, excelente clÃ­nica.' }
    ],
    heroTitle: 'EstÃ©tica dental exclusiva y confianza familiar',
    heroSubtitle: 'DiseÃ±amos sonrisas Ãºnicas combinando excelencia clÃ­nica, materiales premium y un trato cÃ¡lido e individualizado.'
  },
  {
    id: 'clinicadental',
    name: 'ClÃ­nica Dental',
    tagline: 'Cuidado Dental Profesional',
    logoText: 'ClÃ­nica Dental',
    primaryColor: '#181c1e',
    secondaryColor: '#f8fafc',
    accentColor: '#64748b',
    whatsAppNumber: '+1 (555) 0123-4567',
    address: 'Av. Lomas Dentales 123, Huixquilucan, Edo. MÃ©x.',
    hours: 'Lunes a Viernes: 9:00 AM - 7:00 PM Â· SÃ¡bado: 9:00 AM - 2:00 PM',
    doctors: ['Dr. Juan Carlos', 'Dr. PÃ©rez'],
    treatments: [
      { id: 'limpieza', name: 'Limpieza Dental Ultrasonido', description: 'EliminaciÃ³n profunda de sarro y pulido dental.', priceRange: '$600 - $1,200 MXN', duration: '45 min' },
      { id: 'general', name: 'Consulta General y DiagnÃ³stico', description: 'RevisiÃ³n completa de salud oral.', priceRange: '$500 - $900 MXN', duration: '30 min' }
    ],
    reviews: [
      { author: 'Juan Carlos', stars: 5, text: 'Excelente servicio en la clÃ­nica.' }
    ],
    heroTitle: 'Cuidado dental profesional para toda tu familia',
    heroSubtitle: 'Agenda hoy tu consulta de valoraciÃ³n y da el primer paso hacia la sonrisa que mereces.'
  }
];
export const clinics: ClinicConfig[] = allClinics.filter(c => c.id === 'leal');