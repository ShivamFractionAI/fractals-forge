export interface LeaderboardEntry {
  rank: number;
  user: string;
  username?: string;
  deposits: string;
  referrals: string;
  defiActivities: string;
  dailyFractals: string;
  totalFractals: string;
  isCurrentUser?: boolean;
}

export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    user: "0x5687...4e90",
    deposits: "2.52b",
    referrals: "0.00",
    defiActivities: "0.00",
    dailyFractals: "8.96m",
    totalFractals: "2.52b",
  },
  {
    rank: 2,
    user: "0xE574...7C64",
    deposits: "1.68b",
    referrals: "0.00",
    defiActivities: "0.00",
    dailyFractals: "13.11m",
    totalFractals: "1.68b",
  },
  {
    rank: 3,
    user: "0x68D7...43f2",
    deposits: "0.95b",
    referrals: "0.00",
    defiActivities: "0.00",
    dailyFractals: "3.65m",
    totalFractals: "0.95b",
  },
  {
    rank: 4,
    user: "0x1778...7770",
    deposits: "0.82b",
    referrals: "6.53m",
    defiActivities: "0.00",
    dailyFractals: "40.18k",
    totalFractals: "0.83b",
  },
  {
    rank: 5,
    user: "0xDbE2...78f7",
    deposits: "0.59b",
    referrals: "58.79m",
    defiActivities: "164.44m",
    dailyFractals: "6.19m",
    totalFractals: "0.81b",
  },
  {
    rank: 789,
    user: "0x2aD2...d026",
    username: "firmcord2345",
    deposits: "10000",
    referrals: "600",
    defiActivities: "9000",
    dailyFractals: "400",
    totalFractals: "20,000",
    isCurrentUser: true,
  },
];
