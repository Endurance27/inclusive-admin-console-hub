import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const Overview = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [heroContent, setHeroContent] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [focusAreas, setFocusAreas] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const [heroRes, statsRes, metricsRes, areasRes, testimonialsRes] = await Promise.all([
      supabase.from("hero_content").select("*").maybeSingle(),
      supabase.from("stats_cards").select("*").order("display_order"),
      supabase.from("impact_metrics").select("*").order("display_order"),
      supabase.from("focus_areas").select("*").order("display_order"),
      supabase.from("testimonials").select("*").order("display_order"),
    ]);

    if (heroRes.data) setHeroContent(heroRes.data);
    if (statsRes.data) setStats(statsRes.data);
    if (metricsRes.data) setMetrics(metricsRes.data);
    if (areasRes.data) setFocusAreas(areasRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    setLoading(false);
  };

  const saveHero = async () => {
    const { error } = await supabase
      .from("hero_content")
      .update({
        title: heroContent.title,
        subtitle: heroContent.subtitle,
        cta_primary_text: heroContent.cta_primary_text,
        cta_secondary_text: heroContent.cta_secondary_text,
      })
      .eq("id", heroContent.id);

    if (error) {
      toast({ title: "Error saving hero content", variant: "destructive" });
    } else {
      toast({ title: "Hero content saved successfully" });
    }
  };

  const saveStats = async () => {
    for (const stat of stats) {
      await supabase
        .from("stats_cards")
        .update({ label: stat.label, value: stat.value })
        .eq("id", stat.id);
    }
    toast({ title: "Stats saved successfully" });
  };

  const saveMetrics = async () => {
    for (const metric of metrics) {
      await supabase
        .from("impact_metrics")
        .update({ label: metric.label, value: metric.value, growth_percentage: metric.growth_percentage })
        .eq("id", metric.id);
    }
    toast({ title: "Metrics saved successfully" });
  };

  const saveFocusAreas = async () => {
    for (const area of focusAreas) {
      await supabase
        .from("focus_areas")
        .update({ title: area.title, description: area.description })
        .eq("id", area.id);
    }
    toast({ title: "Focus areas saved successfully" });
  };

  const saveTestimonials = async () => {
    for (const testimonial of testimonials) {
      await supabase
        .from("testimonials")
        .update({
          quote: testimonial.quote,
          author_name: testimonial.author_name,
          author_title: testimonial.author_title,
          organization: testimonial.organization,
        })
        .eq("id", testimonial.id);
    }
    toast({ title: "Testimonials saved successfully" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Website Content Management</h1>
        <p className="text-muted-foreground">Edit the content that appears on your public website</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="stats">Stats Cards</TabsTrigger>
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
          <TabsTrigger value="focus">Focus Areas</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <Textarea
                  value={heroContent?.title || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea
                  value={heroContent?.subtitle || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Button Text</Label>
                  <Textarea
                    value={heroContent?.cta_primary_text || ""}
                    onChange={(e) => setHeroContent({ ...heroContent, cta_primary_text: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Textarea
                    value={heroContent?.cta_secondary_text || ""}
                    onChange={(e) => setHeroContent({ ...heroContent, cta_secondary_text: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <Button onClick={saveHero}>Save Hero Content</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Stats Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {stats.map((stat, idx) => (
                <div key={stat.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label>Label</Label>
                    <Textarea
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...stats];
                        newStats[idx].label = e.target.value;
                        setStats(newStats);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Textarea
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...stats];
                        newStats[idx].value = e.target.value;
                        setStats(newStats);
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={saveStats}>Save Stats</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.map((metric, idx) => (
                <div key={metric.id} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label>Label</Label>
                    <Textarea
                      value={metric.label}
                      onChange={(e) => {
                        const newMetrics = [...metrics];
                        newMetrics[idx].label = e.target.value;
                        setMetrics(newMetrics);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Textarea
                      value={metric.value}
                      onChange={(e) => {
                        const newMetrics = [...metrics];
                        newMetrics[idx].value = e.target.value;
                        setMetrics(newMetrics);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Growth %</Label>
                    <Textarea
                      value={metric.growth_percentage}
                      onChange={(e) => {
                        const newMetrics = [...metrics];
                        newMetrics[idx].growth_percentage = e.target.value;
                        setMetrics(newMetrics);
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={saveMetrics}>Save Metrics</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="focus">
          <Card>
            <CardHeader>
              <CardTitle>Focus Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {focusAreas.map((area, idx) => (
                <div key={area.id} className="space-y-4 p-4 border rounded-lg">
                  <div>
                    <Label>Title</Label>
                    <Textarea
                      value={area.title}
                      onChange={(e) => {
                        const newAreas = [...focusAreas];
                        newAreas[idx].title = e.target.value;
                        setFocusAreas(newAreas);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={area.description}
                      onChange={(e) => {
                        const newAreas = [...focusAreas];
                        newAreas[idx].description = e.target.value;
                        setFocusAreas(newAreas);
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={saveFocusAreas}>Save Focus Areas</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {testimonials.map((testimonial, idx) => (
                <div key={testimonial.id} className="space-y-4 p-4 border rounded-lg">
                  <div>
                    <Label>Quote</Label>
                    <Textarea
                      value={testimonial.quote}
                      onChange={(e) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[idx].quote = e.target.value;
                        setTestimonials(newTestimonials);
                      }}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Author Name</Label>
                      <Textarea
                        value={testimonial.author_name}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[idx].author_name = e.target.value;
                          setTestimonials(newTestimonials);
                        }}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Author Title</Label>
                      <Textarea
                        value={testimonial.author_title}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[idx].author_title = e.target.value;
                          setTestimonials(newTestimonials);
                        }}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <Textarea
                        value={testimonial.organization}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[idx].organization = e.target.value;
                          setTestimonials(newTestimonials);
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={saveTestimonials}>Save Testimonials</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Overview;
