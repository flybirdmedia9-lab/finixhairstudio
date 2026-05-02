
-- Create demo_config table
CREATE TABLE public.demo_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expires_at TIMESTAMPTZ DEFAULT now() + interval '24 hours',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demo_config ENABLE ROW LEVEL SECURITY;

-- Allow anonymous SELECT
CREATE POLICY "Anyone can read demo_config"
  ON public.demo_config FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous UPDATE
CREATE POLICY "Anyone can update demo_config"
  ON public.demo_config FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial row
INSERT INTO public.demo_config (id) VALUES (gen_random_uuid());
