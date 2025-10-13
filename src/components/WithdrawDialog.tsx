import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { agents } from "@/data/agentsData";
import { ArrowDown } from "lucide-react";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgentId?: number;
}

export const WithdrawDialog = ({ open, onOpenChange, selectedAgentId }: WithdrawDialogProps) => {
  const [amount, setAmount] = useState("");
  const maxBalance = 22.0;
  const conversionRate = 1.0409; // Mock conversion rate - AgentUSD to USDC

  const selectedAgent = agents.find((a) => a.id === selectedAgentId || 1);

  const handlePercentage = (percentage: number) => {
    const value = (maxBalance * percentage) / 100;
    setAmount(value.toFixed(2));
  };

  const usdcAmount = amount ? (Number(amount) * conversionRate).toFixed(6) : "0.00";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">WITHDRAW</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Agent Token Input */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${selectedAgent?.color} rounded-full flex items-center justify-center`}>
                  <span className="text-lg font-bold">$</span>
                </div>
                <div>
                  <p className="font-semibold">{selectedAgent?.name}USD</p>
                  <p className="text-xs text-muted-foreground">Base</p>
                </div>
              </div>
              <div className="text-right">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="text-2xl font-bold bg-transparent text-right outline-none w-32"
                />
                <p className="text-sm text-muted-foreground">Max: {maxBalance}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {[10, 25, 50, 75].map((pct) => (
                <Button
                  key={pct}
                  variant="secondary"
                  className="flex-1 bg-muted hover:bg-muted/80"
                  onClick={() => handlePercentage(pct)}
                >
                  {pct}%
                </Button>
              ))}
              <Button
                variant="secondary"
                className="flex-1 bg-muted hover:bg-muted/80"
                onClick={() => handlePercentage(100)}
              >
                MAX
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* USDC Output */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="font-semibold">USDC</p>
                  <p className="text-xs text-muted-foreground">Base</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{usdcAmount}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Withdrawals may be instant or take up to 24 hours.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 bg-secondary hover:bg-secondary/80 font-bold"
              onClick={() => onOpenChange(false)}
            >
              CANCEL
            </Button>
            <Button className="flex-1 bg-chart-green hover:bg-chart-green/90 text-black font-bold">
              WITHDRAW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
