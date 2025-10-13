export interface Agent {
  id: number;
  name: string;
  icon: string;
  apy: number;
  rewardApy?: number;
  tvl: string;
  color: string;
  description: string;
  chain: string;
}

export interface Protocol {
  name: string;
  chain: string;
  allocation: number;
  risk: string;
  apy: number;
  color: string;
}

export interface UserPosition {
  agentId: number;
  value: number;
  pnl: number;
  projectedEarnings: number;
}
