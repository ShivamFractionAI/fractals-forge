import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { agents } from "@/data/agentsData";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgentId?: number;
}

export const WithdrawDialog = ({ open, onOpenChange, selectedAgentId }: WithdrawDialogProps) => {
  const [amount, setAmount] = useState("");
  const maxBalance = 200000.0;

  const selectedAgent = agents.find((a) => a.id === selectedAgentId || 1);

  const handlePercentage = (percentage: number) => {
    const value = (maxBalance * percentage) / 100;
    setAmount(value.toFixed(2));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">WITHDRAW</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
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
                <p className="text-2xl font-bold">{amount || "0.00"}</p>
                <p className="text-sm text-muted-foreground">Max: {maxBalance.toLocaleString()} USDC</p>
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

          <p className="text-sm text-muted-foreground text-center">
            Withdrawals may be instant or take up to 24 hours.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 bg-secondary hover:bg-secondary/80"
              onClick={() => onOpenChange(false)}
            >
              CANCEL
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              WITHDRAW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
