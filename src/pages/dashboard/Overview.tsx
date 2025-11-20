import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, Target } from "lucide-react";

const stats = [
  {
    title: "Active Campaigns",
    value: "24",
    change: "+3 this month",
    icon: Target,
  },
  {
    title: "Community Members",
    value: "15.2k",
    change: "+18% this year",
    icon: Users,
  },
  {
    title: "Tweets Analyzed",
    value: "450k",
    change: "+12k this week",
    icon: BarChart3,
  },
  {
    title: "Engagement Rate",
    value: "89%",
    change: "+5% this year",
    icon: TrendingUp,
  },
];

const recentCampaigns = [
  {
    name: "Mental Health Awareness Week",
    status: "Active",
    reach: "45.2k",
    engagement: "92%",
  },
  {
    name: "Disability Rights Forum",
    status: "Active",
    reach: "38.1k",
    engagement: "87%",
  },
  {
    name: "End VAW Campaign",
    status: "Scheduled",
    reach: "-",
    engagement: "-",
  },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor your advocacy campaigns and social impact
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.name}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Status: {campaign.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Reach: {campaign.reach}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Engagement: {campaign.engagement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
