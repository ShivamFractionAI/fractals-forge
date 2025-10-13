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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Gradient Header Card */}
        <Card className="relative overflow-hidden border-border mb-8">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-pink via-gradient-purple to-gradient-blue opacity-90" />
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-8">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            {/* Agent Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl md:text-5xl border-2 border-white/30">
                {agentIcons[agent.icon]}
              </div>
            </div>

            {/* Agent Name */}
            <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-4">{agent.name}</h1>

            {/* Address */}
            <p className="text-white/80 text-center text-sm mb-6 font-mono">
              0xBe53A109B494E5c9f97b90Cd39Fe969BBE68BF6204
            </p>

            {/* Badges */}
            <div className="flex justify-center gap-3 mb-8">
              <div className="px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <span className="text-white font-bold">USD Coin</span>
              </div>
              <div className="px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <span className="text-white font-bold">Base</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-white/70 text-xs md:text-sm mb-1">Total deposited, USDC</p>
                <p className="text-2xl md:text-3xl font-bold text-white">22,184,405.92</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs md:text-sm mb-1">Historical APY</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{agent.apy}%</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs md:text-sm mb-1">Value in USDC</p>
                <p className="text-2xl md:text-3xl font-bold text-white">0.00</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs md:text-sm mb-1">Est. APY</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{(agent.apy * 1.7).toFixed(2)}%</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-8">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setWithdrawOpen(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white font-bold px-8"
              >
                WITHDRAW
              </Button>
              <Button 
                size="lg"
                onClick={() => setDepositOpen(true)}
                className="bg-white hover:bg-white/90 text-gradient-purple font-bold px-8"
              >
                DEPOSIT
              </Button>
            </div>
          </div>
        </Card>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-chart-green uppercase tracking-wide mb-2">FEE</p>
            <p className="text-3xl font-bold">0%</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-chart-green uppercase tracking-wide mb-2">VAULT ADDRESS</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-mono">0x3A43...9De7</p>
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-xs text-chart-green uppercase tracking-wide mb-2">DEPOSIT CAP</p>
            <p className="text-xl font-bold">$43.71m / $100.00m</p>
            <div className="mt-3 h-2 bg-secondary/30 rounded-full overflow-hidden">
              <div className="h-full bg-chart-green" style={{ width: "43.71%" }} />
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
