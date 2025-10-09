import { BarChart, Bar, ResponsiveContainer } from "recharts";

interface APYChartProps {
  apy: number;
  rank: string;
}

const generateMockData = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    value: Math.random() * 10 + 2,
  }));
};

export const APYChart = ({ apy, rank }: APYChartProps) => {
  const data = generateMockData();

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">7D APY</p>
          <p className="text-3xl font-bold">{apy}%</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">APY RANK</p>
          <p className="text-3xl font-bold">{rank}</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Bar dataKey="value" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
