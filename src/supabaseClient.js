// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcusyvtujsluhmtuiaqz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdXN5dnR1anNsdWhtdHVpYXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzA1NDUsImV4cCI6MjA2OTkwNjU0NX0.KtfZUSLfLabhGgSrlTNz4ROkoEp7xDIDWSKfR10k08k';

export const supabase = createClient(supabaseUrl, supabaseKey);
