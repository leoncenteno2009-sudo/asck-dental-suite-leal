import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import type { ClinicData, Patient } from './types';

const now = () => new Date().toISOString();

const patient = (p: Omit<Patient, 'createdAt' | 'updatedAt'>): Patient => ({
  ...p,
  createdAt: now(),
  updatedAt: now(),
});

export async function createSeedData(): Promise<ClinicData> {
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026', 12);

  return {
    users: [
      {
        id: uuid(),
        name: 'Dr. PÃ©rez',
        email: 'admin@clinicadental.local',
        passwordHash,
        role: 'admin',
        createdAt: now(),
      },
    ],
    patients: [],
    appointments: [],
    chats: [],
    budgets: [],
    odontograms: [],
    notifications: [
      {
        id: uuid(),
        title: 'Entorno clÃ­nico inicializado',
        desc: 'La API local segura, autenticaciÃ³n y base de datos persistente estÃ¡n activas.',
        time: 'Ahora',
        read: false,
        createdAt: now(),
      },
    ],
    auditLogs: [],
    settings: {
      clinicName: 'Leal Dental / Dra. Leticia',
      tagline: 'Cuidado Premium para la Sonrisa de tu Familia',
      notationSystem: 'universal',
      whatsAppNumber: '+525555551234',
      complianceMode: 'demo',
      updatedAt: now(),
    },
  };
}

