import { WETH_ABI, WETH_CONTRACT_ADDRESS } from "@/config/constants";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useCallback, useEffect, useState } from "react";
import { encodeFunctionData, formatEther, fromHex, getAddress } from "viem";

export const useWethBalance = () => {
  const { safe, sdk } = useSafeAppsSDK();
  const [wethBalance, setWethBalance] = useState("");

  const fetchWethBalance = useCallback(async () => {
    const wethContractAddress = WETH_CONTRACT_ADDRESS[safe.chainId];
    const data = encodeFunctionData({
      abi: WETH_ABI,
      functionName: "balanceOf",
      args: [getAddress(safe.safeAddress)],
    });
    const config = {
      from: "0x0000000000000000000000000000000000000000",
      to: wethContractAddress,
      data: data,
    };
    const result = await sdk.eth.call([config]);
    const weiBalance = fromHex(result as `0x${string}`, "bigint");
    const wethBalance = formatEther(weiBalance);
    setWethBalance(wethBalance);
  }, [safe.chainId, safe.safeAddress, sdk.eth]);

  useEffect(() => {
    fetchWethBalance();
  }, [fetchWethBalance]);

  return wethBalance;
};
