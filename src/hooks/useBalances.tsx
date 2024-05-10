import { WETH_ABI, WETH_CONTRACT_ADDRESS } from "@/config/constants";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useCallback, useEffect, useState } from "react";
import { encodeFunctionData, formatEther, fromHex, getAddress } from "viem";

export const useBalances = () => {
  const { safe, sdk } = useSafeAppsSDK();

  const getWethBalance = async () => {
    if (!safe?.safeAddress || !sdk) return "0";
    try {
      const wethContractAddress = WETH_CONTRACT_ADDRESS[safe.chainId];
      const data = encodeFunctionData({
        abi: WETH_ABI,
        functionName: "balanceOf",
        args: [getAddress(safe.safeAddress)],
      });
      const config = {
        to: wethContractAddress,
        data: data,
      };
      const result = await sdk.eth.call([config]);
      const weiBalance = fromHex(result as `0x${string}`, "bigint");
      const wethBalance = formatEther(weiBalance);
      return wethBalance;
    } catch (error) {
      console.error(error);
    }
  };

  const getEthBalance = async () => {
    if (!sdk) return "0";
    try {
      const balances = await sdk.safe.experimental_getBalances();
      const item = balances.items.find(
        (item) => item.tokenInfo.symbol === "ETH"
      );
      if (!item) return "0";
      const weiBalance = fromHex(item.balance as `0x${string}`, "bigint");
      const ethBalance = formatEther(weiBalance);
      return ethBalance;
    } catch (error) {
      console.error(error);
    }
  };

  return { getEthBalance, getWethBalance };
};
