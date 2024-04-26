import InputForm from "@/components/Input";
import { WETH_ABI, WETH_ADDRESS } from "@/config/constants";
import { useIsSafeApp } from "@/hooks/useIsSafeApp";
import { fetchWethBalance } from "@/utils/weth";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { encodeFunctionData, formatEther, fromHex, getAddress } from "viem";

export default function WrapEth() {
  const [ethBalance, setEthBalance] = useState("");
  const [wethBalance, setWethBalance] = useState("");
  const { safe, sdk } = useSafeAppsSDK();

  useEffect(() => {
    const fetchEthBalance = async () => {
      const balances = await sdk.safe.experimental_getBalances();
      const item = balances.items.find(
        (item) => item.tokenInfo.symbol === "ETH"
      );
      if (!item) return "0";
      const weiBalance = fromHex(item.balance as `0x${string}`, "bigint");
      const ethBalance = formatEther(weiBalance);
      setEthBalance(ethBalance);
    };
    const fetchWethBalance = async () => {
      if (!safe.safeAddress) return;
      const wethContractAddress = WETH_ADDRESS[safe.chainId];
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
    };
    fetchEthBalance();
    fetchWethBalance();
  }, [safe.chainId, safe.safeAddress, sdk.eth, sdk.safe]);

  return (
    <>
      <InputForm isWrap={true} balance={ethBalance} />
      <InputForm isWrap={false} balance={wethBalance} />
    </>
  );
}
