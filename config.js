const SUPABASE_URL = 'https://yrnouqvtqnmunqxzougq.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_AYz3s6uDYzZq8BqW9tm_FQ_uRyhTgJA';

// إنشاء اتصال Supabase
window.sbClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log('Supabase connected successfully');