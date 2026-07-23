# Guía de Demostración Comercial - ASCK Dental Core System

Esta guía establece el protocolo y libreto comercial sugerido para presentar la demostración interactiva del sistema a prospectos dentales en México.

---

## 📢 Mensaje Base de Venta

> **"No es solo una página web. Es un sistema ligero para captar pacientes, recibir solicitudes de valoración, organizar prospectos, agendar citas y dar seguimiento por WhatsApp."**

---

## 🗺️ Flujo Recomendado de Presentación (Libreto de Pitch)

Para lograr un impacto comercial óptimo en menos de 10 minutos, sigue este orden exacto:

### Paso 1: Configuración Inicial de Marca (`/admin/configuracion`)
*   **Qué hacer**: Abre `/admin/configuracion` en presencia del prospecto. Cambia entre los presets (ej. *Dr. Enrique Caxnajoy*, *Clínica Dental Advance* o *Leal Dental / Dra. Leticia*).
*   **Qué decir**: *"Diseñamos este sistema sobre un núcleo común configurable. Esto significa que podemos adaptar toda la identidad visual, colores primarios, logotipos, horarios, sucursales y médicos a la medida de tu consultorio en cuestión de minutos, garantizando que el paciente siempre vea tu marca."*
*   **Qué observar**: Muestra cómo la micro-landing page del lado derecho actualiza sus colores y textos en tiempo real.

### Paso 2: La Experiencia del Paciente (`/`)
*   **Qué hacer**: Navega a la raíz `/` para mostrar la Landing Page pública ya configurada con el preset del cliente.
*   **Qué decir**: *"Esta es la página que verán tus pacientes cuando te busquen en Google o den clic en tus campañas de publicidad. Es sumamente limpia, carga en milisegundos y resalta de inmediato tus tratamientos estrella, los médicos encargados y opiniones de pacientes reales para generar confianza instantánea."*

### Paso 3: Captación de Prospectos (`/valoracion`)
*   **Qué hacer**: En la sección de tratamientos, haz clic en alguno (ej. *Ortodoncia Invisible*) para abrir el formulario móvil de valoración. Llena datos de prueba frente a ellos (usa un nombre ficticio y nivel de urgencia *Alta*).
*   **Qué decir**: *"En lugar de un formulario de contacto aburrido, ofrecemos un portal móvil interactivo donde el paciente nos indica cuál es su tratamiento de interés y su nivel de urgencia o dolor. Esto te permite priorizar la atención de urgencias y aumentar la conversión. Al enviarlo, el paciente es invitado a continuar la conversación por WhatsApp con un mensaje pre-configurado."*

### Paso 4: El Control Administrativo y CRM (`/admin/pipeline`)
*   **Qué hacer**: Entra al Tablero CRM (`/admin/pipeline`) para mostrar la tarjeta del lead recién creado.
*   **Qué decir**: *"Tan pronto como el paciente envía su solicitud de valoración, tu recepcionista o tú reciben los datos en este tablero de control interactivo. No hay necesidad de revisar correos perdidos; aquí organizas a tus prospectos en etapas comerciales (desde Nuevo hasta Tratamiento Propuesto o Cerrado). Puedes dar clic en el ícono de WhatsApp para iniciar un chat directo y dar seguimiento sin escribir textos desde cero."*

### Paso 5: La Agenda Diaria (`/admin/agenda`)
*   **Qué hacer**: Ve a la sección de la Agenda y da clic en una cita programada para desplegar el panel lateral de detalles.
*   **Qué decir**: *"Cuando confirmes la cita del paciente, esta se agenda en nuestro calendario digital optimizado para médicos. Tienes una vista clara de qué médico atiende y en qué consultorio. Desde la ficha de detalle lateral, tu asistente puede hacer clic en 'Confirmar por WhatsApp' para enviarle un recordatorio dinámico con fecha, hora y ubicación."*

### Paso 6: Plantillas de WhatsApp (`/admin/whatsapp`)
*   **Qué hacer**: Muestra el Centro de WhatsApp y cambia de plantilla para ver la simulación en el celular mockup.
*   **Qué decir**: *"Puedes estandarizar la comunicación de tu clínica. Tenemos plantillas pre-cargadas para la confirmación de citas, envío de presupuestos y seguimiento post-valoración. El sistema sustituye automáticamente el nombre del paciente, la clínica y los horarios, y te permite previsualizar el mensaje tal como se verá en un smartphone."*

---

## 🛠️ Justificación Comercial de Paquetes

Presenta las tres opciones de implementación de acuerdo a las necesidades y tamaño de la clínica:

1.  **Dental Presencia Pro ($8,500 – $12,500 MXN)**
    *   *Enfoque*: Médicos independientes o consultorios nuevos.
    *   *Argumento*: *"Te da presencia profesional e identidad local en Google Maps y redes. Ideal para que los pacientes te localicen y agenden directamente por WhatsApp."*
2.  **Dental Captación + Agenda ($14,500 – $19,500 MXN)** (Recomendado)
    *   *Enfoque*: Clínicas en crecimiento que quieren automatizar su prospección.
    *   *Argumento*: *"Incluye el formulario inteligente de valoración estética, códigos QR de captación para tu sala de espera y el CRM básico para que no se te pierda ningún lead."*
3.  **Dental Clínica Pro ($20,000 – $28,000 MXN)**
    *   *Enfoque*: Clínicas consolidadas con múltiples doctores y alto flujo de pacientes.
    *   *Argumento*: *"Es la suite completa. Obtienes el dashboard Bento de KPIs, calendario multi-doctor avanzado, el módulo de plantillas de WhatsApp personalizadas y total control del branding corporativo."*
4.  **Mantenimiento Opcional ($1,500 – $3,000 MXN/mes)**
    *   *Argumento*: *"No te atamos a rentas mensuales forzosas. La plataforma es de tu propiedad. Sin embargo, te ofrecemos soporte técnico completo, respaldos encriptados automáticos y hospedaje web seguro para tu tranquilidad."*

---

## ⚙️ Funcionalidades de Demo vs. Implementación Final

Es crítico aclarar qué parte está operando localmente y qué requerirá desarrollo en producción:

| Característica | Estado en la Demo | Implementación en Producción |
| :--- | :--- | :--- |
| **Persistencia de Leads** | Almacenamiento local del navegador (`localStorage`) | Base de datos SQLite/PostgreSQL relacional centralizada |
| **Envío de WhatsApp** | Enlace estandarizado `https://wa.me/` dinámico | Integración con API oficial de WhatsApp Business (opcional) |
| **Buscador global** | Filtrado en tiempo real en memoria del navegador | Búsqueda indexada en base de datos del backend |
| **Notificaciones** | Contadores y alertas simuladas por sesión | Sistema de sockets en tiempo real y correos automáticos |

---

## ⚠️ Lo que NO se debe mostrar o asegurar (Claims Peligrosos)

Para evitar responsabilidades legales o quejas comerciales, **NUNCA** prometas ni menciones los siguientes puntos:
*   ❌ **NO digas que el sistema cuenta con encriptación de 256-bits** ni seguridad militar (en demo todo corre local en el navegador o red básica).
*   ❌ **NO garantices cumplimiento HIPAA definitivo** (el cumplimiento HIPAA requiere auditorías complejas de servidor y procesos del personal, no solo software).
*   ❌ **NO prometas volumen de pacientes garantizados** ni aumentos de facturación matemáticos.
*   ❌ **NO muestres el módulo de expediente clínico completo** si aún no ha sido migrado y adaptado con firmas de consentimiento reales.

---

## 📋 Lista de Verificación (Checklist) para Pasar a Producción

Una vez que el cliente aprueba la propuesta comercial, utiliza esta lista para migrar la demo a un sistema productivo real:

- [ ] **Migración de Datos**: Solicitar el catálogo de pacientes actuales del médico (Excel/CSV) e importarlo mediante seeders.
- [ ] **Base de Datos Central**: Configurar la base de datos relacional SQLite/PostgreSQL y conectar los endpoints del frontend al backend real en `server/index.ts`.
- [ ] **Dominio y Hosting**: Adquirir dominio propio (ej. `www.clinicadvance.mx`) y configurar el hosting VPS o Cloud.
- [ ] **Seguridad SSL**: Habilitar certificados HTTPS/SSL obligatorios para proteger los datos médicos y de contacto.
- [ ] **Políticas y Aviso de Privacidad**: Redactar e integrar el aviso de privacidad conforme a la Ley Federal de Protección de Datos Personales (LFPDPPP) en México.
- [ ] **WhatsApp Business**: Configurar la cuenta de la clínica en Facebook Business Manager si desean integrar la API oficial de WhatsApp Cloud.
- [ ] **Roles y Permisos**: Crear usuarios y contraseñas seguras individuales para el asistente, médicos y el administrador general.
- [ ] **Pruebas de Estrés**: Validar la carga de radiografías y adjuntos pesados en el hosting web contratado.
