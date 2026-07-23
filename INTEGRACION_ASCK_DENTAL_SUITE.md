# Integración de ASCK Dental Suite

Este documento detalla el estado actual, la arquitectura y los resultados del proceso de unificación de **ASCK Dental Core System** (base comercial) con **Dental Printer** (módulos clínicos avanzados) en la rama `feature/asck-dental-suite-integration`.

---

## 1. Módulos Integrados

Se ha completado satisfactoriamente la integración modular de los siguientes componentes, conformando un flujo unificado sin interferir con la lógica preexistente:

1. **Núcleo Comercial Shell:**
   - **Landing Page Pública (`/`):** Totalmente responsiva y configurable dinámicamente según la marca activa.
   - **Valoración Estética (`/valoracion`):** Captación del lead y enlace de redirección dinámica a WhatsApp.
   - **Planes Comerciales (`/planes`):** Presentación comercial orientada a venta de licencia única ("llave en mano").
   - **Tablero CRM Kanban (`/admin/pipeline`):** Flujo de seguimiento comercial de prospectos con transiciones fluidas.
   - **Centro WhatsApp (`/admin/whatsapp`):** Previsualización en mockup de celular de plantillas de mensajería con sustituciones.
   - **Configuración de Marca (`/admin/configuracion`):** Panel interactivo para alternar entre los presets comerciales (Dr. Caxnajoy, Advance, Leal Dental) y cambiar colores y textos en tiempo real.

2. **Módulos Clínicos Avanzados (Upgrade):**
   - **Calendario Avanzado (`/admin/agenda`):** Migración de la vista timeline interactiva, vista mensual y semanal, con prevención de traslapes médicos en backend.
   - **Directorio de Pacientes (`/admin/pacientes`):** Búsqueda insensible a acentos, ordenamiento y panel de filtros avanzados (nivel de riesgo, alergias).
   - **Archivero Manila (`/admin/archivero/:patientId`):** Interfaz del gabinete Manila para la apertura del expediente clínico de pacientes activos.
   - **Historia Clínica Oficial:** Formulario exhaustivo de 11 secciones clínicas con progreso dinámico de completado.
   - **Odontograma FDI (`/admin/odontograma/:patientId`):** Carta dental interactiva 2D, marcaje de patologías e historial de intervenciones dentales.
   - **Cotizador y Presupuestos (`/admin/presupuestos/:patientId`):** Generador de estimaciones conectado con el odontograma y copia rápida del presupuesto formateado para WhatsApp.
   - **Firma Digital:** Canvas táctil integrado en el archivero para firmas de consentimiento.
   - **Impresión Estéril:** Estilos CSS `@media print` optimizados para la impresión física o generación de PDF limpia del expediente clínico.
   - **Archivero de Adjuntos:** Carga y visor integrado de radiografías, recetas y archivos PDF/imágenes protegidos tras sesión.

---

## 2. Módulos Pendientes / Futuras Extensiones

Los siguientes módulos no fueron contemplados en la fase demo comercial, pero quedan estructurados para la fase de producción:
- **Facturación Electrónica:** Generación de archivos XML y PDF conforme a los requerimientos del SAT mexicano.
- **Recordatorios Automáticos:** Bots de WhatsApp mediante la API oficial en la nube (WhatsApp Cloud API) para citas.
- **Sincronización multi-sucursal Cloud:** Centralización e indexación compleja de historiales para múltiples sucursales remotas.

---

## 3. Estado de Compilación y Validación

- **Prisma Schema (`npx prisma validate`):** **Exitoso 🚀**. El esquema se validó exitosamente. Se aplicó la migración `20260703015158_add_origen_to_paciente` para añadir el campo `origen` a la tabla `Paciente` en la base de datos local SQLite.
- **Linter de TypeScript (`tsc --noEmit`):** **Exitoso (0 Errores / 0 Advertencias)**.
- **Compilación de Producción (Vite Build):** **Exitoso (30.36s)**. Compila sin advertencias con code splitting de Lucide Icons y React, generando el bundle en `dist/` de forma optimizada.

---

## 4. Flujo Probado de Lead a Paciente

El flujo se encuentra totalmente conectado y es operable en la demo mediante la siguiente secuencia:
1. **Captación:** Un usuario llena su solicitud de valoración estética en `/valoracion` (o mediante el landing de su tratamiento preferido).
2. **Registro CRM:** Los datos entran al pipeline comercial en `/admin/pipeline` bajo la columna **"Nuevo"**.
3. **Conversión Activa:** El administrador da clic en el botón de **"Convertir a Paciente"** (icono de usuarios) de la tarjeta del lead.
4. **Persistencia y Redirección:** El sistema realiza un POST al backend, creando el expediente del paciente, mapeando su nivel de urgencia a nivel de riesgo, y guardando el canal de adquisición en la base de datos (`origen: "Formulario"`, `"WhatsApp"`, etc.). Inmediatamente después, el CRM limpia la tarjeta del lead y redirige al administrador al expediente Manila del paciente (`/admin/archivero/DP-2026-XXXX`).

---

## 5. Riesgos Técnicos y Consideraciones Clínicas

> [!WARNING]
> **Base de Datos SQLite en Local:** El motor de base de datos actual (SQLite) se bloquea temporalmente si más de 5 a 10 usuarios realizan escrituras simultáneas en red local. Es ideal para consultorios independientes, pero requiere PostgreSQL si se escala a nube o se operan múltiples computadoras concurrentes.
> **Almacenamiento Local de Radiografías:** Los archivos cargados se escriben físicamente en el disco duro del servidor local (carpeta `/uploads`). Es crítico alertar que si el disco duro falla y no se tienen copias de seguridad de la carpeta, los archivos se perderán permanentemente.
> **Trasmisión en Texto Plano:** Al ejecutarse localmente por HTTP, la red no está encriptada, lo que expone datos médicos a sniffing dentro de la red del consultorio. Habilitar HTTPS es obligatorio antes del uso real.
