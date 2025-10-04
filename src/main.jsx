import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { supabase } from '@/lib/supabase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Test bağlantısı
supabase.from('companies').select('*').limit(1)
  .then(result => console.log('✅ Supabase Bağlantı Testi:', result))
  .catch(err => console.error('❌ Supabase Bağlantı Hatası:', err));