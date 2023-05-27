import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

export const supaClient = createClient(ENV.SUPABASE_PROJECT_URL, ENV.SUPABASE_API_KEY);
