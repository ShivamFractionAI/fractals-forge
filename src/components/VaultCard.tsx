import { Card } from "@/components/ui/card";
import { Agent } from "@/types/vault";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

interface VaultCardProps {
  agent: Agent;
}

const agentIcons: Record<string, string> = {
  "agent-1": "₿",
  "agent-2": "$",
  "agent-3": "⟠",
  "agent-4": "$",
  "agent-5": "◈",
  "agent-6": "◎",
  "agent-7": "◆",
  "agent-8": "⬡",
  "agent-9": "◉",
  "agent-10": "◐",
};

export const VaultCard = ({ agent }: VaultCardProps) => {
  const navigate = useNavigate();

  const getColorClass = (agentId: number) => {
    return `bg-agent-${agentId}`;
  };

  return (
    <Card 
      className="bg-card border-border p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
      onClick={() => navigate(`/agent/${agent.id}`)}
    >
      {/* Header with Icon and Name */}
      <div className="flex items-start gap-3">
        <div className={`${getColorClass(agent.id)} w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
          {agentIcons[agent.icon]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.chain}</p>
          <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
        </div>
      </div>

      {/* Supply APR */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">Supply APR</span>
          <Info className="w-3.5 h-3.5" />
        </div>
        <span className="text-2xl font-bold">{agent.apy}%</span>
      </div>

      {/* Total Supply */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total supply</span>
        <span className="text-lg font-semibold">{agent.tvl}</span>
      </div>

      {/* Markets - Placeholder icons */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">Markets</span>
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1">
          {/* Market icon placeholders */}
          <div className="w-6 h-6 rounded-full bg-agent-1 flex items-center justify-center text-xs">₿</div>
          <div className="w-6 h-6 rounded-full bg-agent-3 flex items-center justify-center text-xs">⟠</div>
          {agent.id <= 4 && <div className="w-6 h-6 rounded-full bg-agent-2 flex items-center justify-center text-xs">$</div>}
        </div>
      </div>

      {/* Network */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-muted-foreground">Network</span>
        <div className="w-8 h-8 rounded-lg bg-network-avax flex items-center justify-center">
          <span className="text-xs font-bold">▲</span>
        </div>
      </div>
    </Card>
  );
};
