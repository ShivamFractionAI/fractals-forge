import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronDown } from "lucide-react";
import { agents } from "@/data/agentsData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgentId?: number;
}

export const DepositDialog = ({ open, onOpenChange, selectedAgentId }: DepositDialogProps) => {
  const [amount, setAmount] = useState("");
  const [agentId, setAgentId] = useState(selectedAgentId || 1);
  const balance = 1000.0;

  const selectedAgent = agents.find((a) => a.id === agentId);
  const conversionRate = 0.960746; // Mock conversion rate

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
          {/* USDC Input */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">USDC</p>
                  <p className="font-semibold">USD Coin</p>
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
                <p className="text-sm text-muted-foreground">${balance.toLocaleString()}</p>
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
            <p className="text-right text-sm text-muted-foreground">Max: {amount || "0"}</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Agent Selection */}
          <div className="bg-secondary rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-12 h-12 bg-${selectedAgent?.color} rounded-full flex items-center justify-center`}>
                  <span className="text-lg font-bold">$</span>
                </div>
                <div className="flex-1">
                  <Select value={agentId.toString()} onValueChange={(val) => setAgentId(Number(val))}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-auto">
                      <div className="text-left">
                        <p className="font-semibold">{selectedAgent?.name}USDC</p>
                        <p className="text-xs text-muted-foreground">Base</p>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
                          {agent.name}USDC
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{amount ? (Number(amount) * conversionRate).toFixed(6) : "0.00"}</p>
                <p className="text-sm text-muted-foreground">${amount || "0.00"}</p>
              </div>
            </div>
          </div>

          {/* APY and Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">APY</p>
              <p className="text-lg font-bold">{selectedAgent?.apy}%</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-sm font-medium">1 {selectedAgent?.name}USD = {(1 / conversionRate).toFixed(4)} USD</p>
            </div>
          </div>

          <Button className="w-full bg-chart-green hover:bg-chart-green/90 text-black font-bold text-lg py-6">
            APPROVE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
