import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/vault";
import { useNavigate } from "react-router-dom";

interface VaultCardProps {
  agent: Agent;
}

const agentIcons: Record<string, string> = {
  "agent-1": "💎",
  "agent-2": "₿",
  "agent-3": "$",
  "agent-4": "€",
};

export const VaultCard = ({ agent }: VaultCardProps) => {
  const navigate = useNavigate();

  const getColorClass = (agentId: number) => {
    switch (agentId) {
      case 1:
        return "bg-agent-1";
      case 2:
        return "bg-agent-2";
      case 3:
        return "bg-agent-3";
      case 4:
        return "bg-agent-4";
      default:
        return "bg-agent-1";
    }
  };

  return (
    <Card className="bg-card border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className={`${getColorClass(agent.id)} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}>
          {agentIcons[agent.icon]}
        </div>
        <h3 className="text-xl font-semibold">{agent.name}</h3>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">YIELD</p>
        <p className={`text-4xl font-bold text-${agent.color}`}>
          {agent.apy}% APY
        </p>
        {agent.rewardApy && (
          <p className={`text-sm text-${agent.color} mt-1`}>
            + {agent.rewardApy}% REWARD APY
          </p>
        )}
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">TVL</p>
        <p className="text-xl">{agent.tvl}</p>
      </div>

      <Button
        className={`w-full ${getColorClass(agent.id)} text-black font-bold hover:opacity-90`}
        onClick={() => navigate(`/agent/${agent.id}`)}
      >
        START EARNING
      </Button>
    </Card>
  );
};
