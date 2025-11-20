import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical } from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "Mental Health Awareness Week",
    theme: "Mental Health & Wellness",
    status: "active",
    startDate: "2025-01-15",
    reach: "45.2k",
    engagement: "92%",
  },
  {
    id: 2,
    name: "Disability Rights Forum",
    theme: "Persons with Disabilities",
    status: "active",
    startDate: "2025-01-10",
    reach: "38.1k",
    engagement: "87%",
  },
  {
    id: 3,
    name: "End VAW Campaign",
    theme: "Violence Against Women",
    status: "scheduled",
    startDate: "2025-02-01",
    reach: "-",
    engagement: "-",
  },
  {
    id: 4,
    name: "LGBTQ+ Rights Initiative",
    theme: "LGBTQ+ Rights",
    status: "planning",
    startDate: "2025-02-15",
    reach: "-",
    engagement: "-",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success/10 text-success border-success/20";
    case "scheduled":
      return "bg-primary/10 text-primary border-primary/20";
    case "planning":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Campaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your advocacy campaigns
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{campaign.theme}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Started: {campaign.startDate}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reach</p>
                  <p className="text-xl font-semibold">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-xl font-semibold">{campaign.engagement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
