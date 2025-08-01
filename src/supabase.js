import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfmagojishzukviwrhfo.supabase.co'; // Reemplazá
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbWFnb2ppc2h6dWt2aXdyaGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjQ2MDgsImV4cCI6MjA2OTY0MDYwOH0.HRwiyD5BnbkgzWsjAtwxfZvetBFIpzT49bcCdJI0Rsk'; // Reemplazá

export const supabase = createClient(supabaseUrl, supabaseKey);
