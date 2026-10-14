
import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('connection_test')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Supabase test failed:', error.message);
    return;
  }

  console.log('Supabase connection successful:', data);
}
