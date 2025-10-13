import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VaultCard } from "@/components/VaultCard";
import { DepositDialog } from "@/components/DepositDialog";
import { WithdrawDialog } from "@/components/WithdrawDialog";
import { agents } from "@/data/agentsData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"tvl" | "apy">("tvl");

  const sortedAgents = useMemo(() => {
    return [...agents].sort((a, b) => {
      if (sortBy === "apy") {
        return b.apy - a.apy;
      }
      // For TVL, extract numeric value from string like "$31.8m"
      const aTvl = parseFloat(a.tvl.replace(/[$m]/g, ""));
      const bTvl = parseFloat(b.tvl.replace(/[$m]/g, ""));
      return bTvl - aTvl;
    });
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold">Your positions</h1>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setWithdrawOpen(true)}>
              WITHDRAW
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setDepositOpen(true)}>
              DEPOSIT
            </Button>
          </div>
        </div>

        {/* Position Summary */}
        <Card className="bg-card border-border p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">POSITION VALUE</p>
              <p className="text-3xl font-bold">$234,900.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">BLENDED YIELD</p>
              <p className="text-3xl font-bold">45%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">TOTAL FRACTALS</p>
              <p className="text-3xl font-bold">200.00</p>
              <button className="text-sm text-chart-green hover:underline mt-1">View Points</button>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">LEADERBOARD POSITION</p>
              <p className="text-3xl font-bold">789</p>
              <button 
                onClick={() => navigate("/leaderboard")}
                className="text-sm text-chart-green hover:underline mt-1"
              >
                View leaderboard
              </button>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">AVAILABLE TO DEPOSIT</p>
              <p className="text-3xl font-bold">$100,000.00</p>
              <p className="text-sm text-muted-foreground mt-1">
                Up to 11% APY and 0.00 points daily{" "}
                <button className="text-chart-green hover:underline">View and deposit</button>
              </p>
            </div>
          </div>
        </Card>

        {/* Available Vaults */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available vaults</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/positions")}
                className="text-sm text-chart-green hover:underline"
              >
                Your Positions →
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={(val) => setSortBy(val as "tvl" | "apy")}>
                  <SelectTrigger className="w-24 h-9 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tvl">TVL</SelectItem>
                    <SelectItem value="apy">APY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedAgents.map((agent) => (
              <VaultCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* For You Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">For you</h2>
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-agent-4 rounded-lg flex items-center justify-center text-3xl font-bold">
                  2x
                </div>
                <div>
                  <h3 className="text-xl font-bold text-agent-4 mb-1">DEPOSIT AND EARN 2X FRACTALS</h3>
                  <p className="text-sm text-muted-foreground">Earning 2 Fractals per $1 per day</p>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 font-bold" onClick={() => setDepositOpen(true)}>
                START EARNING
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  );
};

export default Index;
