import { Protocol } from "@/types/vault";
import { ChevronRight } from "lucide-react";

interface VaultBreakdownProps {
  protocols: Protocol[];
  totalApy: number;
}

export const VaultBreakdown = ({ protocols, totalApy }: VaultBreakdownProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase">Vault Breakdown</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Placeholder */}
        <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">{totalApy}% APY</p>
            <p className="text-muted-foreground">7D APY</p>
          </div>
        </div>

        {/* Allocation Table */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-xs text-chart-green uppercase font-semibold mb-2">
            <div>ALLOCATION</div>
            <div className="text-center">RISK</div>
            <div className="text-right">7D APY</div>
          </div>
          {protocols.map((protocol, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-1 h-12 rounded"
                    style={{ backgroundColor: protocol.color }}
                  />
                  <div>
                    <p className="font-semibold">{protocol.name}</p>
                    <p className="text-sm text-muted-foreground">{protocol.chain}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center flex-1">
                  <p className="font-semibold">{protocol.allocation}%</p>
                  <p className="text-center text-muted-foreground">{protocol.risk}</p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="font-semibold">{protocol.apy}%</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
