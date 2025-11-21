-- Create table for hero section content
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  hero_image_url TEXT,
  cta_primary_text TEXT DEFAULT 'Explore Analytics',
  cta_primary_link TEXT DEFAULT '/analytics',
  cta_secondary_text TEXT DEFAULT 'Join Community',
  cta_secondary_link TEXT DEFAULT '/community',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for stats cards
CREATE TABLE public.stats_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for impact metrics
CREATE TABLE public.impact_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  growth_percentage TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for focus areas/themes
CREATE TABLE public.focus_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  hashtags TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_title TEXT NOT NULL,
  organization TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can view hero content"
  ON public.hero_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update hero content"
  ON public.hero_content FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert hero content"
  ON public.hero_content FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can view stats cards"
  ON public.stats_cards FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage stats cards"
  ON public.stats_cards FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can view impact metrics"
  ON public.impact_metrics FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage impact metrics"
  ON public.impact_metrics FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can view focus areas"
  ON public.focus_areas FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage focus areas"
  ON public.focus_areas FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can view testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON public.testimonials FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Insert initial data based on website
INSERT INTO public.hero_content (title, subtitle) VALUES 
  ('AI-Powered Advocacy for Inclusive Ghana', 'Leveraging social media analytics to drive awareness and action for persons with disabilities, VAW prevention, mental health, and LGBTQ+ rights in Ghana.');

INSERT INTO public.stats_cards (label, value, icon, display_order) VALUES
  ('Active Campaigns', '24', 'TrendingUp', 1),
  ('Community Members', '15.2k', 'Users', 2),
  ('Tweets Analyzed', '450k', 'BarChart3', 3),
  ('Organizations', '89', 'Shield', 4);

INSERT INTO public.impact_metrics (label, value, growth_percentage, display_order) VALUES
  ('Social Impact Reach', '2.3M', '+23% this year', 1),
  ('Active Advocates', '15.2k', '+18% this year', 2),
  ('Policy Changes', '47', '+12% this year', 3),
  ('Campaign Success Rate', '89%', '+5% this year', 4);

INSERT INTO public.focus_areas (title, description, hashtags, slug, display_order) VALUES
  ('Persons with Disabilities', 'Advocating for accessibility and inclusion of PwDs in Ghana', ARRAY['#InclusionMatters', '#DisabilityRightsGH'], 'disabilities', 1),
  ('Violence Against Women', 'Fighting gender-based violence through awareness and support', ARRAY['#EndVAW', '#StandWithWomen'], 'vaw', 2),
  ('Mental Health & Wellness', 'Breaking stigma and promoting mental wellness for all', ARRAY['#BreakTheStigma', '#MentalHealthAwareness'], 'mental-health', 3),
  ('LGBTQ+ Communities', 'Supporting inclusion and rights for LGBTQ+ individuals', ARRAY['#LGBTQRights', '#LoveIsLove'], 'lgbtq', 4);

INSERT INTO public.testimonials (quote, author_name, author_title, organization, display_order) VALUES
  ('AI4InclusiveGh has revolutionized how we track and measure advocacy impact. Their analytics help us reach the right audiences with the right message.', 'Johnson Acquah', 'Director', 'Ghana Disability Rights Coalition', 1),
  ('The social media insights provided by this platform have been invaluable in shaping our mental health awareness campaigns across Ghana.', 'Kwame Adu', 'Program Manager', 'Mental Health Ghana', 2),
  ('Working with AI4InclusiveGh has amplified our voice in fighting gender-based violence. Their data helps us understand and address the real issues.', 'Emmanuel Arthur', 'Executive Director', 'Women''s Rights Coalition', 3);