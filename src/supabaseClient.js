// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogazqhvmowacaqacxzfg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYXpxaHZtb3dhY2FxYWN4emZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Nzk1MzMsImV4cCI6MjA3MDQ1NTUzM30.yRfzvhyQaWWZX444si_QaXehx6PAkOyK7NzYKkMLFkA';

export const supabase = createClient(supabaseUrl, supabaseKey);
