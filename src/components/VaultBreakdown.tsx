import { Protocol } from "@/types/vault";
import { ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface VaultBreakdownProps {
  protocols: Protocol[];
  totalApy: number;
}

export const VaultBreakdown = ({ protocols, totalApy }: VaultBreakdownProps) => {
  const chartData = protocols.map((protocol) => ({
    name: protocol.name,
    value: protocol.allocation,
    apy: protocol.apy,
    color: protocol.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-sm text-chart-green">{payload[0].payload.apy}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase">Vault Breakdown</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">7D APY</p>
              <p className="text-3xl font-bold">{totalApy}%</p>
            </div>
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
