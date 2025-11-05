import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, RefreshCw, Repeat } from "lucide-react";

interface Activity {
  agentName: string;
  action: "deposited" | "withdrew" | "rebalanced" | "looped";
  amount: string;
  protocol?: string;
  timestamp: string;
  color: string;
}

const activities: Activity[] = [
  { agentName: "Arya", action: "deposited", amount: "$12,450", protocol: "Aave", timestamp: "2m ago", color: "var(--agent-1)" },
  { agentName: "Jon", action: "rebalanced", amount: "$8,920", protocol: "Compound → Aave", timestamp: "5m ago", color: "var(--agent-2)" },
  { agentName: "Drogo", action: "looped", amount: "$25,100", protocol: "Aave", timestamp: "8m ago", color: "var(--agent-3)" },
  { agentName: "Khaleesi", action: "withdrew", amount: "$5,680", protocol: "Morpho", timestamp: "12m ago", color: "var(--agent-4)" },
  { agentName: "Sansa", action: "deposited", amount: "$18,300", protocol: "Yearn", timestamp: "15m ago", color: "var(--agent-5)" },
  { agentName: "Tyrion", action: "rebalanced", amount: "$11,200", protocol: "Yearn → Aave", timestamp: "18m ago", color: "var(--agent-6)" },
  { agentName: "Cersei", action: "looped", amount: "$32,700", protocol: "Compound", timestamp: "22m ago", color: "var(--agent-7)" },
  { agentName: "Jaime", action: "deposited", amount: "$9,450", protocol: "Morpho", timestamp: "25m ago", color: "var(--agent-8)" },
  { agentName: "Bran", action: "withdrew", amount: "$6,120", protocol: "Aave", timestamp: "28m ago", color: "var(--agent-9)" },
  { agentName: "Robb", action: "rebalanced", amount: "$14,890", protocol: "Compound → Morpho", timestamp: "32m ago", color: "var(--agent-10)" },
];

const getActionIcon = (action: Activity["action"]) => {
  switch (action) {
    case "deposited":
      return <TrendingUp className="w-4 h-4" />;
    case "withdrew":
      return <TrendingDown className="w-4 h-4" />;
    case "rebalanced":
      return <RefreshCw className="w-4 h-4" />;
    case "looped":
      return <Repeat className="w-4 h-4" />;
  }
};

const getActionColor = (action: Activity["action"]) => {
  switch (action) {
    case "deposited":
      return "text-chart-green";
    case "withdrew":
      return "text-chart-red";
    case "rebalanced":
      return "text-chart-blue";
    case "looped":
      return "text-chart-purple";
  }
};

export const ActivityMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const scroll = () => {
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      } else {
        marquee.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  const duplicatedActivities = [...activities, ...activities];

  return (
    <div className="w-full overflow-hidden bg-card/50 border-y border-border py-4 mb-12">
      <div
        ref={marqueeRef}
        className="flex gap-6 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-lg whitespace-nowrap min-w-fit hover:bg-card/80 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: activity.color }}
            >
              {activity.agentName[0]}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{activity.agentName}</span>
              <span className={`flex items-center gap-1 ${getActionColor(activity.action)}`}>
                {getActionIcon(activity.action)}
                {activity.action}
              </span>
              <span className="text-foreground font-bold">{activity.amount}</span>
              {activity.protocol && (
                <span className="text-muted-foreground text-sm">via {activity.protocol}</span>
              )}
              <span className="text-muted-foreground text-xs ml-2">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
