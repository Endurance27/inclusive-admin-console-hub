import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Admin",
    joinDate: "2024-01-15",
    contributions: 142,
  },
  {
    id: 2,
    name: "Michael Asante",
    email: "m.asante@example.com",
    role: "Moderator",
    joinDate: "2024-02-20",
    contributions: 98,
  },
  {
    id: 3,
    name: "Ama Mensah",
    email: "ama.m@example.com",
    role: "Contributor",
    joinDate: "2024-03-10",
    contributions: 67,
  },
  {
    id: 4,
    name: "Kwame Osei",
    email: "kwame.o@example.com",
    role: "Contributor",
    joinDate: "2024-03-15",
    contributions: 54,
  },
  {
    id: 5,
    name: "Abena Gyasi",
    email: "abena.g@example.com",
    role: "Contributor",
    joinDate: "2024-04-01",
    contributions: 43,
  },
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-primary/10 text-primary border-primary/20";
    case "Moderator":
      return "bg-success/10 text-success border-success/20";
    case "Contributor":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Community = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Manage your community members and contributors
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getRoleBadgeColor(member.role)}>
                    {member.role}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {member.contributions} contributions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {member.joinDate}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,247</div>
            <p className="text-xs text-muted-foreground">+342 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+89 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
