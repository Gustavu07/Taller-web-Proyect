import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  hero_image_url: string | null;
  about_text: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_promotion: boolean;
  created_at: string;
};

export type Inventory = {
  id: string;
  branch_id: string;
  product_id: string;
  stock: number;
  updated_at: string;
};

export type TransferRequest = {
  id: string;
  product_id: string;
  from_branch_id: string;
  to_branch_id: string;
  customer_code: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  requested_by: string | null;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string | null;
  session_id: string | null;
  message: string;
  is_bot: boolean;
  created_at: string;
};

export type SalesStats = {
  id: string;
  product_id: string;
  branch_id: string;
  total_sales: number;
  total_requests: number;
};