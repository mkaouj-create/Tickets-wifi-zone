
export type UserRole = 'super_admin' | 'agency_admin' | 'employee' | 'accountant';

export interface Agency {
  id: string;
  name: string;
  created_at: string;
}

export interface Profile {
  id: string;
  agency_id: string | null;
  role: UserRole;
  full_name: string | null;
  updated_at: string;
}

export interface Client {
  id: string;
  agency_id: string;
  name: string;
  phone: string | null;
  created_at: string;
}

export interface Ticket {
  id: string;
  agency_id: string;
  code: string;
  price: number;
  duration_minutes: number;
  status: 'active' | 'sold' | 'expired';
  created_at: string;
}

export interface Sale {
  id: string;
  agency_id: string;
  ticket_id: string;
  client_id: string | null;
  seller_id: string | null;
  amount: number;
  sold_at: string;
}

export interface Payment {
  id: string;
  agency_id: string;
  sale_id: string;
  method: string;
  is_verified: boolean;
  created_at: string;
}
