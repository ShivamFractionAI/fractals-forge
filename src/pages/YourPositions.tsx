import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DepositDialog } from "@/components/DepositDialog";
import { WithdrawDialog } from "@/components/WithdrawDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { agents } from "@/data/agentsData";
import { ArrowLeft } from "lucide-react";

// Mock data
const positionsData = [
  { agent: "Arya", deposits: "$50,000", apy: "5.2%" },
  { agent: "Jon", deposits: "$75,000", apy: "14.9%" },
  { agent: "Khaleesi", deposits: "$45,000", apy: "3.1%" },
];

const chartData = [
  { date: "Jan", value: 0 },
  { date: "Feb", value: 20000 },
  { date: "Mar", value: 45000 },
  { date: "Apr", value: 80000 },
  { date: "May", value: 120000 },
  { date: "Jun", value: 170000 },
];

const transactionsData = [
  { type: "Deposit", agent: "Arya", amount: "$50,000", date: "2025-10-01", hash: "0x1234...5678" },
  { type: "Deposit", agent: "Jon", amount: "$75,000", date: "2025-09-15", hash: "0xabcd...efgh" },
  { type: "Withdraw", agent: "Khaleesi", amount: "$10,000", date: "2025-08-20", hash: "0x9876...4321" },
];

const YourPositions = () => {
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("3months");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactionsData.filter((tx) => {
    if (filterType === "all") return true;
    return tx.type.toLowerCase() === filterType;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold">Your positions</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Positions Table */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold mb-4">Positions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm text-muted-foreground font-medium">Vault</th>
                      <th className="text-right py-3 text-sm text-muted-foreground font-medium">Deposits</th>
                      <th className="text-right py-3 text-sm text-muted-foreground font-medium">APY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionsData.length > 0 ? (
                      positionsData.map((position, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 bg-agent-${agents.find(a => a.name === position.agent)?.id} rounded-full flex items-center justify-center text-sm`}>
                                $
                              </div>
                              <span className="font-medium">{position.agent}</span>
                            </div>
                          </td>
                          <td className="text-right font-semibold">{position.deposits}</td>
                          <td className="text-right font-semibold text-chart-green">{position.apy}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-muted-foreground">
                          You don't have active Earn positions on this network.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* My Deposit Chart */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">My Deposit</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
                    <span className="text-sm font-medium">USD</span>
                  </div>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-32 bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1 month</SelectItem>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-4xl font-bold">$170,000</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Your Transactions */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your transactions</h2>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-sm">
                    All
                  </Button>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32 bg-secondary border-border">
                      <SelectValue placeholder="Customize" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdraw">Withdraw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          tx.type === "Deposit" ? "bg-chart-green text-black" : "bg-red-500 text-white"
                        }`}>
                          {tx.type}
                        </div>
                        <div>
                          <p className="font-medium">{tx.agent}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.hash}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No transactions found.</p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 font-bold py-6" 
              onClick={() => setDepositOpen(true)}
            >
              DEPOSIT
            </Button>
            <Button 
              variant="secondary" 
              className="w-full font-bold py-6"
              onClick={() => setWithdrawOpen(true)}
            >
              WITHDRAW
            </Button>
          </div>
        </div>
      </div>

      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  );
};

export default YourPositions;
