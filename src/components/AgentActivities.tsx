import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, RefreshCw, Repeat } from "lucide-react";

interface Activity {
  action: "deposited" | "withdrew" | "rebalanced" | "looped";
  amount: string;
  protocol: string;
  timestamp: string;
  txHash: string;
}

interface AgentActivitiesProps {
  agentName: string;
  agentColor: string;
}

const getActionIcon = (action: Activity["action"]) => {
  switch (action) {
    case "deposited":
      return <TrendingUp className="w-5 h-5" />;
    case "withdrew":
      return <TrendingDown className="w-5 h-5" />;
    case "rebalanced":
      return <RefreshCw className="w-5 h-5" />;
    case "looped":
      return <Repeat className="w-5 h-5" />;
  }
};

const getActionColor = (action: Activity["action"]) => {
  switch (action) {
    case "deposited":
      return "text-chart-green bg-chart-green/10";
    case "withdrew":
      return "text-chart-red bg-chart-red/10";
    case "rebalanced":
      return "text-chart-blue bg-chart-blue/10";
    case "looped":
      return "text-chart-purple bg-chart-purple/10";
  }
};

const getActionDescription = (activity: Activity, agentName: string) => {
  switch (activity.action) {
    case "deposited":
      return `${agentName} deposited ${activity.amount} into ${activity.protocol}`;
    case "withdrew":
      return `${agentName} withdrew ${activity.amount} from ${activity.protocol}`;
    case "rebalanced":
      return `${agentName} rebalanced ${activity.amount} from ${activity.protocol}`;
    case "looped":
      return `${agentName} executed a loop strategy worth ${activity.amount} on ${activity.protocol}`;
  }
};

export const AgentActivities = ({ agentName, agentColor }: AgentActivitiesProps) => {
  const activities: Activity[] = [
    {
      action: "deposited",
      amount: "$45,230.00",
      protocol: "Aave V3",
      timestamp: "2 hours ago",
      txHash: "0x1a2b...3c4d",
    },
    {
      action: "rebalanced",
      amount: "$28,450.00",
      protocol: "Compound → Aave",
      timestamp: "5 hours ago",
      txHash: "0x5e6f...7g8h",
    },
    {
      action: "looped",
      amount: "$62,100.00",
      protocol: "Aave V3",
      timestamp: "8 hours ago",
      txHash: "0x9i0j...1k2l",
    },
    {
      action: "withdrew",
      amount: "$12,800.00",
      protocol: "Morpho",
      timestamp: "12 hours ago",
      txHash: "0x3m4n...5o6p",
    },
    {
      action: "deposited",
      amount: "$38,920.00",
      protocol: "Yearn Finance",
      timestamp: "1 day ago",
      txHash: "0x7q8r...9s0t",
    },
    {
      action: "rebalanced",
      amount: "$51,670.00",
      protocol: "Yearn → Compound",
      timestamp: "2 days ago",
      txHash: "0x1u2v...3w4x",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Agent Activities</h2>
      <Card className="bg-card border-border p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors border border-border/50"
            >
              <div
                className={`p-3 rounded-full ${getActionColor(activity.action)}`}
              >
                {getActionIcon(activity.action)}
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium mb-1">
                  {getActionDescription(activity, agentName)}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-xs">{activity.timestamp}</span>
                  <span>·</span>
                  <a
                    href="#"
                    className="text-chart-green hover:underline text-xs"
                    onClick={(e) => e.preventDefault()}
                  >
                    View on Explorer →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
