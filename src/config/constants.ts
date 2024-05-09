import { parseAbi } from "viem";

// Chains
export const Chains = {
  MAINNET: "1",
  SEPOLIA: "11155111",
};

type ChainConfig<T> = Record<(typeof Chains)[keyof typeof Chains], T>;

export const WETH_CONTRACT_ADDRESS: ChainConfig<string> = {
  [Chains.MAINNET]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [Chains.SEPOLIA]: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
};

// try to use this instead of the interface you create in utils. do it more similar to safe dump does it. use viem encodefunctiondata.
export const WETH_ABI = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function withdraw(uint wad)",
  "function deposit()",
]);
