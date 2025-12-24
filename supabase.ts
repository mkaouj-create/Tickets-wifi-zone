
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvlwhhijzegiqqzjslpk.supabase.co';
const supabaseAnonKey = 'sb_publishable_0tD8NRCaT9uPN6D1UA173Q_OLJ21xrP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
