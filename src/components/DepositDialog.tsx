import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { agents } from "@/data/agentsData";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgentId?: number;
}

export const DepositDialog = ({ open, onOpenChange, selectedAgentId }: DepositDialogProps) => {
  const [amount, setAmount] = useState("");
  const [agentId, setAgentId] = useState(selectedAgentId || 1);
  const balance = 1000.0;
  const maxBalance = 100000.0;

  const selectedAgent = agents.find((a) => a.id === agentId);

  const handlePercentage = (percentage: number) => {
    const value = (balance * percentage) / 100;
    setAmount(value.toFixed(2));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">DEPOSIT</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* USDC Balance */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">W</span>
                </div>
                <div>
                  <p className="font-semibold">USDC</p>
                  <p className="text-sm text-muted-foreground">Base</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{amount || "0.00"} USDC</p>
                <p className="text-sm text-muted-foreground">${maxBalance.toLocaleString()}</p>
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
            <p className="text-right text-sm text-muted-foreground">Max: {amount ? "0" : "0"}</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Agent Selection */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-agent-1 rounded-full flex items-center justify-center text-2xl">
                  💎
                </div>
                <div>
                  <p className="font-semibold">{selectedAgent?.name}</p>
                  <p className="text-sm text-muted-foreground">Base</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">0.00</p>
                <p className="text-sm text-muted-foreground">$0.00</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">APY</p>
              <p className="text-lg font-bold">{selectedAgent?.apy}%</p>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6">
            DEPOSIT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
