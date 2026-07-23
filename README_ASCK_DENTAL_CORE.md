# ASCK Dental Core System - Guía de Demostración Comercial

Esta guía explica el funcionamiento de la demo integrada de **ASCK Dental Core System** para su presentación comercial ante prospectos médicos en México (Huixquilucan, Estado de México).

---

## 🚀 Cómo Iniciar el Entorno de Demo Local

Para levantar el servidor de base de datos local (Express + SQLite) y la aplicación frontend de React (Vite 8 + Tailwind v4), ejecuta el siguiente comando en la raíz del proyecto:

```bash
# Instalar dependencias si es la primera vez
npm install

# Iniciar servidor y cliente simultáneamente
npm run dev:full
```

*   **Portal Público / Administrativo**: `http://localhost:3002`
*   **Servidor Backend**: `http://localhost:4000`

---

## 🎯 Perfiles de Clientes Pre-configurados

En el panel de **Configuración Marca** o a través de la base de datos de presets, puedes alternar instantáneamente la identidad visual de la demo para adaptarla al cliente al que le estás presentando:

1.  **Dr. Enrique Caxnajoy**
    *   *Enfoque*: Marca personal médica, consultorio independiente en Huixquilucan.
    *   *Estilo*: Azul Clínico Profundo (`#00346f`).
2.  **Clínica Dental Advance**
    *   *Enfoque*: Clínica de especialidades múltiples con enfoque premium y moderno, Lomas del Sol.
    *   *Estilo*: Verde Esmeralda Premium (`#0d5c3a`).
3.  **Leal Dental (Dra. Leticia Leal)**
    *   *Enfoque*: Consultorio boutique de alta confianza familiar en Palo Solo, Huixquilucan.
    *   *Estilo*: Teal / Turquesa Elegante (`#008080`).

---

## 🗺️ Mapa de la Demo (Rutas y Flujo)

El enrutador nativo por pathname de la aplicación permite acceder directamente o navegar a las siguientes rutas de demostración:

### 1. Experiencia del Paciente (Vistas Públicas)
*   **Página de Inicio (`/`)**: Landing page de captación. Muestra tratamientos, médicos del preset seleccionado, opiniones de pacientes y un llamado a la valoración gratuita.
*   **Valoración Estética (`/valoracion`)**: Formulario interactivo móvil. Captura nombre, WhatsApp, tratamiento de interés, nivel de urgencia y síntomas.
    *   *Nota*: Al presionar "Solicitar Valoración", el prospecto se registra inmediatamente en el CRM local del doctor y ofrece un botón de WhatsApp pre-llenado con los datos.
*   **Paquetes y Cotizaciones (`/planes`)**: Presentación de paquetes comerciales. Enfatiza que es un **proyecto llave en mano** (implementación única), no un software SaaS con rentas mensuales.

### 2. Panel Administrativo del Doctor (Privado)
Para ingresar a las herramientas de control, haz clic en **Acceso Administrativo** en el footer de la página de inicio o accede directamente a `/admin` (redirecciona a `/admin/dashboard` tras iniciar sesión).

*   **Credenciales por Defecto**:
    *   *Usuario*: `admin@dentalprinter.local`
    *   *Contraseña*: `ChangeMe!2026`

#### Rutas de Administración Sincronizadas:
*   **Panel Control (`/admin/dashboard`)**: Bento grid con KPIs de prospectos, mensajes pendientes de WhatsApp y agenda de hoy.
*   **Tablero CRM (`/admin/pipeline`)**: Tablero Kanban interactivo que organiza a los prospectos en etapas (`Nuevo`, `Contactado`, `Agendado`, `Confirmado`, `Asistió`, etc.) con botones para desplazarlos y contactar vía WhatsApp dinámico.
*   **Agenda de Citas (`/admin/agenda`)**: Agenda diaria de citas. Muestra la franja de médicos activos de la clínica, zona horaria configurada en *Huixquilucan / Estado de México* y una ficha lateral interactiva al dar clic en cualquier cita.
*   **Centro WhatsApp (`/admin/whatsapp`)**: Personalización de plantillas de mensajería interactiva con vista previa sobre mockup de celular en tiempo real.
*   **Configuración Marca (`/admin/configuracion`)**: Módulo para cambiar el preset activo o editar colores y textos directamente, visualizando una micro-landing interactiva en tiempo real.

---

## 🔒 Cumplimiento y Leyendas Clínicas de Seguridad
Para proteger la integridad legal del sistema y evitar falsas expectativas durante el pitch de ventas, la demo incorpora leyendas claras:
*   *Consentimiento de Datos*: El formulario móvil contiene la cláusula *"Tus datos se usarán únicamente para contactarte sobre tu valoración"* en lugar de prometer encriptaciones de grado militar inexistentes en red local.
*   *Validación de Datos*: En todas las vistas administrativas y públicas se muestran etiquetas como *"Información referencial"*, *"Sujeto a valoración"* y *"Dirección y horarios por confirmar"*.
