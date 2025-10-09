import { Agent, Protocol } from "@/types/vault";

export const agents: Agent[] = [
  {
    id: 1,
    name: "Agent 1",
    icon: "agent-1",
    apy: 5,
    tvl: "$43.58m",
    color: "agent-1",
  },
  {
    id: 2,
    name: "Agent 2",
    icon: "agent-2",
    apy: 4,
    tvl: "$13.16m",
    color: "agent-2",
  },
  {
    id: 3,
    name: "Agent 3",
    icon: "agent-3",
    apy: 11,
    tvl: "$26.07m",
    color: "agent-3",
  },
  {
    id: 4,
    name: "Agent 4",
    icon: "agent-4",
    apy: 7,
    rewardApy: 2,
    tvl: "$1.15m",
    color: "agent-4",
  },
];

export const protocolsData: Record<number, Protocol[]> = {
  1: [
    {
      name: "Tokemak baseUSD",
      chain: "Base",
      allocation: 24.11,
      risk: "Moderate",
      apy: 13.85,
      color: "hsl(155, 100%, 50%)",
    },
    {
      name: "Pendle PT-USDe-OCT15",
      chain: "Ethereum",
      allocation: 14.76,
      risk: "Low",
      apy: 9.34,
      color: "hsl(280, 100%, 50%)",
    },
    {
      name: "Fluid GHO Base",
      chain: "Base",
      allocation: 6.82,
      risk: "Low",
      apy: 11.25,
      color: "hsl(330, 100%, 60%)",
    },
    {
      name: "Aave-Umbrella USDT",
      chain: "Ethereum",
      allocation: 6.44,
      risk: "Moderate",
      apy: 8.23,
      color: "hsl(250, 100%, 65%)",
    },
  ],
  2: [
    {
      name: "Compound USDC",
      chain: "Base",
      allocation: 30.5,
      risk: "Low",
      apy: 5.2,
      color: "hsl(35, 100%, 50%)",
    },
    {
      name: "Aave USDC",
      chain: "Ethereum",
      allocation: 25.3,
      risk: "Low",
      apy: 4.8,
      color: "hsl(45, 100%, 50%)",
    },
  ],
  3: [
    {
      name: "Curve 3pool",
      chain: "Ethereum",
      allocation: 40.2,
      risk: "Low",
      apy: 12.5,
      color: "hsl(155, 100%, 50%)",
    },
    {
      name: "Yearn USDC Vault",
      chain: "Base",
      allocation: 35.8,
      risk: "Moderate",
      apy: 10.8,
      color: "hsl(165, 100%, 50%)",
    },
  ],
  4: [
    {
      name: "Balancer Stable Pool",
      chain: "Base",
      allocation: 45.6,
      risk: "Low",
      apy: 8.2,
      color: "hsl(235, 100%, 70%)",
    },
    {
      name: "Stargate USDC",
      chain: "Ethereum",
      allocation: 30.4,
      risk: "Moderate",
      apy: 6.5,
      color: "hsl(245, 100%, 70%)",
    },
  ],
};
