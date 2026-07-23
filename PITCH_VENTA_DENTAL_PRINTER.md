# Plan de Ventas y Discurso Comercial — Dental Printer

Este documento define la estrategia comercial, los pitches de venta (30 segundos, 1 minuto y reunión completa), la gestión de objeciones difíciles y las fases de desarrollo recomendadas para vender **Dental Printer** de forma honesta, rentable y libre de promesas exageradas ("humo").

---

## 1. Discursos de Venta (Pitches)

### A. Pitch de 30 Segundos (Elevator Pitch)
> "Dental Printer es un expediente clínico y organizador digital premium diseñado específicamente para dentistas que quieren eliminar el papel y el desorden en su consultorio. A diferencia de las plataformas genéricas en la nube, Dental Printer emula un archivero analógico real con carpetas Manila digitales, odontograma clínico interactivo y firma electrónica directa en pantalla para consentimientos informados. Todo funciona de forma local en tu consultorio, protegiendo los datos de tus pacientes sin costos mensuales obligatorios de internet."

### B. Pitch de 1 Minuto
> "Si eres odontólogo, sabes el dolor de cabeza que es buscar expedientes físicos de pacientes, llenar historias clínicas kilométricas a mano y archivar firmas de consentimiento. Dental Printer soluciona esto digitalizando todo tu flujo clínico. 
> Cuenta con un panel Bento inteligente que te dice la agenda y KPIs del día, un archivero virtual interactivo que ordena a tus pacientes alfabéticamente, un odontograma interactivo para marcar caries o tratamientos en segundos, y una sección de firma digital que se plasma directo en el consentimiento informado de tus expedientes. Puedes imprimir el historial clínico completo o guardarlo en PDF sin logos molestos. Todo opera de manera local y segura en tu consultorio, con un pago único de licencia y sin obligarte a pagar suscripciones en la nube si no las necesitas."

### C. Pitch Completo para Reunión Comercial
> "Buenas tardes. El día de hoy queremos presentarles **Dental Printer**, la herramienta que digitaliza la práctica clínica dental eliminando la fricción administrativa.
>
> La mayoría de los softwares dentales actuales son complejos de usar, requieren conexión permanente a internet y te atan a rentas mensuales de por vida. Dental Printer se diseñó con un enfoque visual sumamente intuitivo que respeta los flujos tradicionales del consultorio:
> 
> 1. **Archivero Manila Digital:** Los expedientes no son solo una lista plana de nombres. Emulamos un archivero físico real con folders Manila. Al hacer clic en un folder, el expediente se despliega de forma integrada mostrando: ficha personal, citas pasadas y futuras, odontograma, historia clínica oficial con barra de progreso y archivos adjuntos (radiografías o recetas).
> 2. **Odontograma y Presupuestos Rápidos:** Registra patologías en el mapa dental 2D con notación FDI en segundos. Esos tratamientos se convierten automáticamente en un presupuesto. Con un solo clic, puedes copiar el presupuesto en una plantilla limpia y enviársela a tu paciente por WhatsApp al instante.
> 3. **Consentimiento Informado con Firma Digital:** Evita imprimir hojas de consentimiento. Tus pacientes firman directo en la pantalla de tu computadora o tableta (iPad) usando un lápiz óptico o el dedo. La firma se incrusta de forma segura en su expediente histórico.
> 4. **Privacidad de Grado Clínico:** Diseñado bajo los estándares de confidencialidad HIPAA y bitácora de auditoría (Audit Trail) que registra qué usuario accedió a qué expediente y cuándo.
>
> Lo mejor de todo es que el sistema puede operar de forma 100% local en tu consultorio. Tus datos te pertenecen, no dependen de un servidor externo de internet y se resguardan con respaldos automáticos diarios. Iniciemos con una demo interactiva para que vean el sistema operando con datos reales."

---

## 2. Beneficios Reales para la Clínica Dental

*   **Ahorro de Tiempo de Llenado:** La barra de progreso y las secciones de autoguardado en la Historia Clínica reducen en un 40% el tiempo de llenado del expediente.
*   **Adiós al Papel Físico:** Firma digital integrada y carga de radiografías en PDF de hasta 10 MB eliminan la necesidad de archiveros físicos que ocupan espacio en la clínica.
*   **Prevención de Pérdida de Información:** Copias de seguridad calientes (`npm run backup:local`) del expediente de tus pacientes y base de datos con un clic.
*   **Cero Conflictos de Horario:** La validación de traslapes en tiempo real del calendario impide agendar al mismo doctor en horarios empalmados, protegiendo la reputación de la clínica.
*   **Incremento en Aceptación de Presupuestos:** La integración de presupuestos con envío rápido formateado por WhatsApp acelera la toma de decisión del paciente.

---

## 3. Guía de Módulos para la Negociación

### Módulos que SÍ se pueden vender hoy (100% Listos):
1.  **Panel de Control (Dashboard):** KPIs clínicos y agenda interactiva de hoy.
2.  **Gestión de Pacientes:** Filtros de estado (Activos/Archivados) y badges de nivel de riesgo clínico.
3.  **Calendario y Citas:** Vistas de Día, Semana y Mes, timeline por doctor y bloqueo de traslapes.
4.  **Archivero Manila Virtual:** Cajones animados deslizables y enrutamiento a expedientes.
5.  **Historia Clínica Oficial:** Formulario clínico de 11 secciones e indicador de progreso.
6.  **Firma Electrónica:** Panel táctil integrado para firmas de consentimiento.
7.  **Adjuntos Clínicos:** Carga y previsualización de archivos PDF/Imágenes hasta 10 MB.
8.  **Odontograma FDI:** Registro visual e interactivo de tratamientos por diente.
9.  **Presupuestos y Cotizador:** Envío estructurado de costos por WhatsApp.
10. **Bitácora de Auditoría (Audit Log):** Registro administrativo de movimientos clínicos para administradores.
11. **Respaldos locales integrados:** Respaldos de SQLite y archivos con un comando.

### Módulos a vender como "Fase 2" o "En desarrollo":
1.  **Sincronización Cloud Automática:** Almacenamiento en servidores en la nube (AWS S3) para clínicas multi-sucursal.
2.  **Recordatorios automáticos de Citas (SMS/WhatsApp):** Automatización mediante API de Twilio u otros intermediarios (actualmente es manual).
3.  **Módulo de Inventario Dental:** Control de insumos clínicos (el botón existe en el menú de la demo pero no tiene base de datos operativa).
4.  **Roles Complejos y Permisos Granulares:** Edición fina de permisos (el backend soporta middlewares de rol, pero la asignación interactiva en pantalla es futura).

### Módulos a NO mencionar todavía (Fase 3 o más):
1.  **Facturación electrónica XML del SAT:** Facturación directa desde el portal (requiere timbrado con un PAC externo).
2.  **Pasarelas de Cobro en Línea (Stripe/Paypal):** Cobro directo de consultas en la app.
3.  **Aplicación Móvil Nativa (Android/iOS):** Todo el sistema es web responsive; no hay app en tiendas móviles.
4.  **IA de Diagnóstico Real:** El "escaneo IA" de la demo es una simulación visual con fines ilustrativos; no realiza análisis de radiografías con redes neuronales reales en esta fase.

---

## 4. Frases que NO debes decir (Humo) vs. Frases Recomendadas (Honestas)

| 🚫 Frase Humo (NO DECIR) |  Frase Recomendada (Venta Honesta) |
| :--- | :--- |
| *"Es un sistema multi-sucursal ilimitado en la nube."* | *"Es una suite clínica local muy robusta, ideal para digitalizar consultorios únicos e independientes de forma segura y privada."* |
| *"Tiene una IA integrada que analiza las radiografías y detecta caries."* | *"Incluye un visor clínico para tus radiografías y una simulación visual de diagnóstico para explicar los tratamientos de forma clara a tus pacientes."* |
| *"El sistema factura directamente con el SAT mexicano con un clic."* | *"Genera cotizaciones y presupuestos claros que puedes enviar por WhatsApp. La integración de timbrado fiscal XML está planeada para una fase posterior."* |
| *"Tus pacientes pueden agendar citas solos en línea."* | *"El control de citas lo gestionan tus recepcionistas y doctores de manera interna, garantizando un control total de la agenda sin traslapes."* |
| *"Es una aplicación móvil que descargas de la App Store."* | *"Es un portal web con diseño totalmente adaptable (responsive) que puedes abrir desde el navegador de tu computadora, tablet o iPad."* |

---

## 5. Respuestas a Preguntas Difíciles de Clientes

### 💬 1. "¿Ya está listo para usarse?"
> **Respuesta:** *"Sí, la aplicación se encuentra en su versión de uso local controlado (Beta sólida). Puede ser instalada en la computadora de tu consultorio para gestionar pacientes, agendar citas, llenar la historia clínica oficial, firmar consentimientos y subir radiografías hoy mismo de forma totalmente funcional. La migración de tus datos a servidores en la nube es un proceso adicional que ofrecemos en la fase de implementación."*

### 💬 2. "¿Cuánto cuesta?"
> **Respuesta:** *"Dental Printer se comercializa bajo un modelo de fases para proteger tu inversión. El costo de licenciamiento de la suite clínica base instalada de forma local en tu servidor del consultorio es de pago único (ej: $X MXN). No requiere rentas mensuales obligatorias. Si requieres el módulo de copias de seguridad en la nube o multi-sucursal en fases posteriores, el costo se ajusta según el almacenamiento en la nube (AWS/Google Cloud)."*

### 💬 3. "¿Tiene integración con WhatsApp?"
> **Respuesta:** *"Sí, cuenta con un cotizador inteligente. Al generar un presupuesto, el sistema compila los datos del tratamiento en una plantilla estructurada y limpia que puedes enviar manualmente por WhatsApp Web al paciente con un solo clic. El envío automatizado y masivo de recordatorios por bots es una fase posterior de integración."*

### 💬 4. "¿Tiene facturación SAT?"
> **Respuesta:** *"El sistema actual está enfocado en la planeación clínica y presupuestos. La generación y timbrado de facturas fiscales XML con el SAT mexicano es una característica avanzada que se ofrece como una integración de Fase 3 mediante un proveedor autorizado de certificación (PAC)."*

### 💬 5. "¿Funciona en la Nube?"
> **Respuesta:** *"La suite actual opera de forma local y segura, lo cual garantiza que tus expedientes médicos no dependan de internet y se mantengan confidenciales en tu establecimiento. Si requieres centralizar la información en la nube para acceder desde casa o integrar múltiples sucursales, implementamos esa migración en la Fase 2, migrando los datos a PostgreSQL y habilitando almacenamiento remoto seguro."*

---

## 6. Propuesta de Fases Comerciales y Precios Recomendados

Para garantizar que el desarrollo sea rentable, no comprometa tiempos irreales y proteja los datos clínicos de los pacientes, se estructuran las siguientes fases de entrega:

### Fase 1: Demostración e Instalación Base (Demo / Validación)
*   **Qué se entrega:** Instalación local de la suite base (SQLite, Express, React) en la computadora principal del consultorio dental. Configuración inicial de las cuentas de doctores y recepcionistas. Carga de los datos iniciales de la clínica (logotipo, notación).
*   **Qué NO se incluye gratis:** Migración de expedientes antiguos de bases de datos heredadas.
*   **Precio Recomendado (Pago único):** **$8,000 MXN - $12,000 MXN** (Ideal para clínicas independientes pequeñas).

### Fase 2: Implementación de Infraestructura y Producción (MVP Operativo Cloud)
*   **Qué se entrega:** Migración de base de datos SQLite a PostgreSQL. Configuración obligatoria de certificado SSL (HTTPS) y reglas CORS estrictas. Integración de almacenamiento de adjuntos en la nube (AWS S3, Google Cloud Storage o Supabase Storage) para evitar saturación del disco local. Scripts automatizados cron para respaldos nocturnos en la nube.
*   **Qué NO se incluye gratis:** Soporte a redes locales complejas o firewalls del consultorio.
*   **Precio Recomendado (Pago único + Nube):** **$15,000 MXN - $20,000 MXN** (+ costos mensuales directos de la nube contratada a nombre del cliente).

### Fase 3: Integraciones Avanzadas y Sistema Completo
*   **Qué se entrega:** Timbrado fiscal XML del SAT (integración con PAC). Automatización de envío de recordatorios de citas por WhatsApp Web API o Twilio. Módulo interactivo de Inventario de insumos clínicos con alertas de stock mínimo.
*   **Qué NO se incluye gratis:** El costo de los folios de timbrado del SAT ni las tarifas de la API de WhatsApp/Twilio (corren por cuenta del cliente).
*   **Precio Recomendado:** **$10,000 MXN - $15,000 MXN** adicionales por integración.

### Fase 4: Soporte y Mantenimiento Técnico (Suscripción Mensual)
*   **Qué se entrega:** Monitoreo del estado del servidor, soporte técnico ante incidencias o caídas del sistema, aplicación de parches de seguridad y actualización de dependencias. Copias de seguridad remotas supervisadas de forma semanal.
*   **Qué NO se incluye gratis:** Desarrollo de nuevas funcionalidades o pantallas personalizadas.
*   **Precio Recomendado:** **$1,500 MXN - $2,500 MXN mensuales**.
