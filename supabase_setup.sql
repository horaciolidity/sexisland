-- ############################################################
-- SANTUARIO ADULT RESERVE - SUPABASE DATABASE SETUP (IDEMPOTENT)
-- ############################################################

-- 1. PROFILES TABLE (Basic User Info)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  birth_date DATE,
  nationality TEXT,
  phone TEXT,
  locality TEXT,
  preferred_plan TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- 2. MEDICAL PROFILES TABLE (Highly Confidential)
CREATE TABLE IF NOT EXISTS public.medical_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  blood_type TEXT,
  chronic_conditions TEXT,
  medications TEXT,
  allergies TEXT,
  surgeries TEXT,
  mental_health TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.medical_profiles ENABLE ROW LEVEL SECURITY;

-- Policies (Only owner can read/write)
DROP POLICY IF EXISTS "Users can view their own medical profile" ON public.medical_profiles;
CREATE POLICY "Users can view their own medical profile" ON public.medical_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert/update their own medical profile" ON public.medical_profiles;
CREATE POLICY "Users can insert/update their own medical profile" ON public.medical_profiles
  FOR ALL USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- 3. PAYMENTS TABLE (Transaction Logs)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  plan_id TEXT,
  amount_usdc NUMERIC,
  tx_hash TEXT,
  chain_id TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policies (Only owner can see their history)
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;
CREATE POLICY "Users can insert their own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 4. GLOBAL MESSAGES TABLE (Chat)
CREATE TABLE IF NOT EXISTS public.global_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  user_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.global_messages ENABLE ROW LEVEL SECURITY;

-- Policies (Public read, Authenticated write)
DROP POLICY IF EXISTS "Chat messages are viewable by everyone" ON public.global_messages;
CREATE POLICY "Chat messages are viewable by everyone" ON public.global_messages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can post message" ON public.global_messages;
CREATE POLICY "Authenticated users can post message" ON public.global_messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- 5. TRIGGER FOR AUTO-CREATING PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', 'Nuevo Miembro'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if trigger exists is hard in SQL script, so we just drop and create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
