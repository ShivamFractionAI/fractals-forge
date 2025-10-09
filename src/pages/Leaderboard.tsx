import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leaderboardData } from "@/data/leaderboardData";
import { ArrowDown } from "lucide-react";

const Leaderboard = () => {
  const topThree = leaderboardData.slice(0, 3);
  const totalDepositors = 11298;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">LEADERBOARD</h1>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topThree.map((entry, index) => (
            <Card key={entry.rank} className="bg-card border-border p-8 flex flex-col items-center justify-center">
              <p className="text-sm font-bold text-chart-green mb-4 uppercase">
                {index === 0 ? "FIRST PLACE" : index === 1 ? "SECOND PLACE" : "THIRD PLACE"}
              </p>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-chart-green/30 to-chart-green/10 border-2 border-chart-green/50 flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-chart-green">{entry.rank}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{entry.user}</p>
              <p className="text-2xl font-bold">{entry.totalFractals}</p>
            </Card>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div>
          <div className="mb-6">
            <p className="text-sm font-bold text-chart-green uppercase mb-2">LEADERBOARD</p>
            <h2 className="text-3xl font-bold">{totalDepositors.toLocaleString()} Depositors</h2>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-muted-foreground">Rank</TableHead>
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground text-right">Deposits</TableHead>
                  <TableHead className="text-muted-foreground text-right">Referrals</TableHead>
                  <TableHead className="text-muted-foreground text-right">DeFi Activities</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    <div className="flex items-center justify-end gap-1">
                      Daily Fractals <ArrowDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    <div className="flex items-center justify-end gap-1">
                      Total Fractals <ArrowDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow
                    key={entry.rank}
                    className={
                      entry.isCurrentUser
                        ? "bg-chart-green/20 hover:bg-chart-green/25 border-chart-green/30"
                        : "hover:bg-muted/50 border-border"
                    }
                  >
                    <TableCell className="font-medium">{entry.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{entry.username || entry.user}</span>
                        {entry.isCurrentUser && (
                          <span className="px-2 py-0.5 text-xs font-bold bg-chart-green/30 text-chart-green rounded">
                            YOU
                          </span>
                        )}
                      </div>
                      {entry.username && (
                        <div className="text-xs text-muted-foreground">{entry.user}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{entry.deposits}</TableCell>
                    <TableCell className="text-right">{entry.referrals}</TableCell>
                    <TableCell className="text-right">{entry.defiActivities}</TableCell>
                    <TableCell className="text-right">{entry.dailyFractals}</TableCell>
                    <TableCell className="text-right font-medium">{entry.totalFractals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
