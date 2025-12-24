
import { Agency, Ticket } from './types';

export const MOCK_AGENCIES: Agency[] = [
  { id: 'a1', name: 'Premium Cyber-Zone Conakry', created_at: '2023-01-15' },
  { id: 'a2', name: 'Kankan Network Pro', created_at: '2023-05-20' },
  { id: 'a3', name: 'Labé WiFi Cloud', created_at: '2023-08-12' },
];

export const MOCK_TICKET_PLANS = [
  { name: 'Pass 30m', duration_minutes: 30, price: 2000, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { name: 'Standard 1h', duration_minutes: 60, price: 5000, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { name: 'Gamer 3h', duration_minutes: 180, price: 10000, color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  { name: 'Pass Jour 24h', duration_minutes: 1440, price: 25000, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { name: 'Semaine Pro 7j', duration_minutes: 10080, price: 100000, color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { name: 'Mensuel Ultra', duration_minutes: 43200, price: 350000, color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
];

export const MOCK_SALES_STATS = [
  { name: 'Lun', sales: 450000 },
  { name: 'Mar', sales: 620000 },
  { name: 'Mer', sales: 510000 },
  { name: 'Jeu', sales: 780000 },
  { name: 'Ven', sales: 890000 },
  { name: 'Sam', sales: 1240000 },
  { name: 'Dim', sales: 950000 },
];
