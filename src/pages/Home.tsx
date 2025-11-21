import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, BarChart3, Shield } from "lucide-react";

interface HeroContent {
  title: string;
  subtitle: string;
  hero_image_url?: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
}

interface StatCard {
  label: string;
  value: string;
  icon: string;
}

interface ImpactMetric {
  label: string;
  value: string;
  growth_percentage: string;
}

interface FocusArea {
  title: string;
  description: string;
  image_url?: string;
  hashtags: string[];
  slug: string;
}

interface Testimonial {
  quote: string;
  author_name: string;
  author_title: string;
  organization: string;
}

const iconMap: Record<string, any> = {
  TrendingUp,
  Users,
  BarChart3,
  Shield,
};

export default function Home() {
  const navigate = useNavigate();
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const [heroRes, statsRes, metricsRes, areasRes, testimonialsRes] = await Promise.all([
      supabase.from("hero_content").select("*").single(),
      supabase.from("stats_cards").select("*").order("display_order"),
      supabase.from("impact_metrics").select("*").order("display_order"),
      supabase.from("focus_areas").select("*").order("display_order"),
      supabase.from("testimonials").select("*").order("display_order"),
    ]);

    if (heroRes.data) setHero(heroRes.data);
    if (statsRes.data) setStats(statsRes.data);
    if (metricsRes.data) setMetrics(metricsRes.data);
    if (areasRes.data) setFocusAreas(areasRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {hero?.title || "AI-Powered Advocacy for Inclusive Ghana"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {hero?.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate(hero?.cta_primary_link || "/analytics")}>
              {hero?.cta_primary_text || "Explore Analytics"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate(hero?.cta_secondary_link || "/community")}>
              {hero?.cta_secondary_text || "Join Community"}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || TrendingUp;
            return (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Driving Real Impact</h2>
          <p className="text-center text-muted-foreground mb-12">
            Our data-driven approach delivers measurable results for social change.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                  <div className="text-xs text-success">{metric.growth_percentage}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Our Four Focus Areas</h2>
          <p className="text-center text-muted-foreground mb-12">
            We monitor, analyze, and amplify conversations around these critical social issues in Ghana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {focusAreas.map((area, idx) => (
              <Card key={idx} className="overflow-hidden">
                {area.image_url && (
                  <div className="h-48 bg-muted" style={{ backgroundImage: `url(${area.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                  <p className="text-muted-foreground mb-4">{area.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {area.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm text-primary">{tag}</span>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/themes/${area.slug}`)}>Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Trusted by Leading Organizations</h2>
          <p className="text-center text-muted-foreground mb-12">
            See how advocacy organizations across Ghana are using our platform to drive meaningful change.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.author_name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.author_title}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.organization}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of advocates, researchers, and changemakers working toward a more inclusive Ghana.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")}>Get In Touch</Button>
        </div>
      </section>
    </div>
  );
}
