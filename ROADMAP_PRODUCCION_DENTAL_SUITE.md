# Roadmap de Producción: ASCK Dental Suite

Este documento establece el roadmap técnico y de cumplimiento normativo necesario para migrar la demo comercial de **ASCK Dental Suite** a un entorno productivo real y certificado para el manejo de Información de Salud Protegida Electrónica (ePHI) en México.

---

## Fase 1 — Infraestructura y Base de Datos (Cloud)

1. **Migración a PostgreSQL:**
   - Reemplazar la base de datos local SQLite (`prisma/dev.db`) por un clúster administrado y redundante de PostgreSQL (ej. AWS RDS, Supabase, o Neon).
   - El archivo `prisma/schema.prisma` está pre-configurado para migrar el proveedor de `sqlite` a `postgresql` simplemente cambiando el datasource:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
2. **Hospedaje VPS:**
   - Desplegar la API en Express y la base de datos en un Servidor Privado Virtual (VPS) como DigitalOcean, AWS EC2 o render, configurando Node.js con un gestor de procesos (PM2) para garantizar alta disponibilidad.
3. **Servicios de Red Segura (HTTPS/SSL):**
   - Obtener y configurar certificados SSL obligatorios (Let's Encrypt o Cloudflare SSL) para forzar redirección HTTP a HTTPS. Esto encripta la trasmisión de datos sensibles de pacientes previniendo la interceptación en tránsito.

---

## Fase 2 — Almacenamiento Seguro y Cumplimiento Legal

1. **Almacenamiento de Adjuntos (AWS S3):**
   - Reemplazar la carga local de radiografías y archivos (carpeta local `/uploads` gestionada con Multer) por un bucket en la nube seguro de AWS S3 o Google Cloud Storage con cifrado en reposo (cifrado AES-256) y URLs firmadas de corta duración.
2. **Aviso de Privacidad (LFPDPPP):**
   - Integrar formalmente los textos legales del Aviso de Privacidad conforme a la **Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)** en México.
   - Implementar las solicitudes ARCO (Acceso, Rectificación, Cancelación y Oposición) dentro del panel administrativo para los pacientes.
3. **Bitácora de Auditoría Clínica (Audit Trail):**
   - Aunque la demo ya escribe registros en `RegistroAuditoria` (actor, acción, fecha, IP, recurso modificado), se debe blindar la tabla impidiendo que cualquier rol de usuario clínico o administrativo pueda editar o borrar registros de la bitácora (logs inmutables).

---

## Fase 3 — Control de Acceso y WhatsApp Cloud API

1. **Gestión Estricta de Usuarios y Roles:**
   - Rotar la variable `JWT_SECRET` por una firma criptográfica larga en variables de entorno.
   - Habilitar el cierre automático de sesión tras 15 minutos de inactividad para proteger estaciones de trabajo abandonadas.
   - Habilitar autenticación de dos factores (2FA) para doctores y administradores.
2. **Integración Oficial de WhatsApp Business Cloud API:**
   - Migrar el flujo manual de enlaces `wa.me` a llamadas API automatizadas del lado del servidor utilizando la **API oficial de WhatsApp Business** (a través de Meta for Developers) para enviar recordatorios automáticos de confirmación de citas y cotizaciones aprobadas de manera desatendida.
3. **Pruebas de Estrés y Concurrencia:**
   - Ejecutar pruebas de carga para asegurar que el backend responda con tiempos de latencia menores a 200ms bajo el uso concurrente de múltiples doctores y asistentes (usando herramientas como K6 o Artillery).
