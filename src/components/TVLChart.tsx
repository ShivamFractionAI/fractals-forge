import { LineChart, Line, ResponsiveContainer } from "recharts";

interface TVLChartProps {
  tvl: string;
}

const generateMockData = () => {
  let value = 20;
  return Array.from({ length: 100 }, () => {
    value += (Math.random() - 0.3) * 2;
    return { value: Math.max(10, value) };
  });
};

export const TVLChart = ({ tvl }: TVLChartProps) => {
  const data = generateMockData();

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">TVL</p>
        <p className="text-3xl font-bold">{tvl}</p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--chart-green))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
