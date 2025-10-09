import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ExternalLink, Info } from "lucide-react";
import { agents, protocolsData } from "@/data/agentsData";
import { APYChart } from "@/components/APYChart";
import { TVLChart } from "@/components/TVLChart";
import { HowItWorks } from "@/components/HowItWorks";
import { VaultBreakdown } from "@/components/VaultBreakdown";
import { DepositDialog } from "@/components/DepositDialog";
import { WithdrawDialog } from "@/components/WithdrawDialog";

const agentIcons: Record<string, string> = {
  "agent-1": "💎",
  "agent-2": "₿",
  "agent-3": "$",
  "agent-4": "€",
};

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const agent = agents.find((a) => a.id === Number(id));
  const protocols = protocolsData[Number(id)] || [];

  if (!agent) {
    return <div>Agent not found</div>;
  }

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Vaults</span>
          </button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setWithdrawOpen(true)}>
              WITHDRAW
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setDepositOpen(true)}>
              DEPOSIT
            </Button>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`${getColorClass(agent.id)} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
            {agentIcons[agent.icon]}
          </div>
          <h1 className="text-3xl font-bold">{agent.name}</h1>
        </div>

        {/* Position Summary */}
        <Card className="bg-card border-border p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">POSITION VALUE</p>
              <p className="text-xl font-bold">0.00 ETH</p>
              <p className="text-sm text-muted-foreground">$0.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                P&L <Info className="w-3 h-3" />
              </p>
              <p className="text-xl font-bold">0.00 ETH</p>
              <p className="text-sm text-muted-foreground">$0.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                PROJECTED 1Y EARNINGS <Info className="w-3 h-3" />
              </p>
              <p className="text-xl font-bold">0.00 ETH</p>
              <p className="text-sm text-muted-foreground">$0.00</p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button variant="secondary" onClick={() => setWithdrawOpen(true)}>
                WITHDRAW
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setDepositOpen(true)}>
                DEPOSIT
              </Button>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <APYChart apy={agent.apy} rank="Top 8%" />
          <TVLChart tvl={agent.tvl} />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">FEE</p>
            <p className="text-2xl font-bold">0%</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">PRICE</p>
            <p className="text-lg font-bold">1 yoUSD ⇄ 1.0400 USD</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">VAULT ADDRESS</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono">0x0000...8a65</p>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">DEPOSIT CAP</p>
            <p className="text-lg font-bold">{agent.tvl} / $50.00m</p>
            <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-chart-green" style={{ width: "52%" }} />
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <HowItWorks />
        </div>

        {/* Vault Breakdown */}
        <VaultBreakdown protocols={protocols} totalApy={agent.apy} />
      </div>

      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} selectedAgentId={agent.id} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} selectedAgentId={agent.id} />
    </div>
  );
};

export default AgentDetail;
