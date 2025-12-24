
import { Agency, Ticket } from './types';

export const MOCK_AGENCIES: Agency[] = [
  { id: 'a1', name: 'Cyber Center Conakry', created_at: '2023-01-15' },
  { id: 'a2', name: 'Wifi Zone Kankan', created_at: '2023-05-20' },
];

export const MOCK_TICKET_PLANS = [
  { name: '30 Minutes', duration_minutes: 30, price: 2000, color: 'bg-blue-100 text-blue-700' },
  { name: '1 Heure', duration_minutes: 60, price: 5000, color: 'bg-green-100 text-green-700' },
  { name: '3 Heures', duration_minutes: 180, price: 10000, color: 'bg-indigo-100 text-indigo-700' },
  { name: '24 Heures', duration_minutes: 1440, price: 25000, color: 'bg-purple-100 text-purple-700' },
  { name: '7 Jours', duration_minutes: 10080, price: 100000, color: 'bg-amber-100 text-amber-700' },
];

export const MOCK_SALES_STATS = [
  { name: 'Lun', sales: 450000 },
  { name: 'Mar', sales: 320000 },
  { name: 'Mer', sales: 210000 },
  { name: 'Jeu', sales: 280000 },
  { name: 'Ven', sales: 190000 },
  { name: 'Sam', sales: 240000 },
  { name: 'Dim', sales: 350000 },
];
