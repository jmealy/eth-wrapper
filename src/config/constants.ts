import { parseAbi } from "viem";

// Chains
export const Chains = {
  MAINNET: "1",
  SEPOLIA: "11155111",
};

type ChainConfig<T> = Record<(typeof Chains)[keyof typeof Chains], T>;

export const WETH_ADDRESS: ChainConfig<string> = {
  [Chains.MAINNET]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [Chains.SEPOLIA]: "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
};

export const WETH_ABI = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
]);
