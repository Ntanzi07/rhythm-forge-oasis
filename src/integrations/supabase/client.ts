// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iokhxwdhkifzuhsrgevz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva2h4d2Roa2lmenVoc3JnZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjA0MzUsImV4cCI6MjA2NDEzNjQzNX0.kUBZ0wAmoqKpJYcZJCYHwHhTWz-StbdTNLZ9VC0sBgw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);