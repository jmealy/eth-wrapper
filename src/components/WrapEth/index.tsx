import InputForm from "@/components/Input";
import { WETH_ABI, WETH_CONTRACT_ADDRESS } from "@/config/constants";
import { useIsSafeApp } from "@/hooks/useIsSafeApp";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { encodeFunctionData, formatEther, fromHex, getAddress } from "viem";
import { fetchWethBalance } from "@/utils/weth";

export default function WrapEth() {
  const [ethBalance, setEthBalance] = useState("");
  const [wethBalance, setWethBalance] = useState<string>("");
  const { safe, sdk } = useSafeAppsSDK();

  useEffect(() => {
    const getEthBalance = async () => {
      const balances = await sdk.safe.experimental_getBalances();
      const item = balances.items.find(
        (item) => item.tokenInfo.symbol === "ETH"
      );
      if (!item) return "0";
      const weiBalance = fromHex(item.balance as `0x${string}`, "bigint");
      const ethBalance = formatEther(weiBalance);
      setEthBalance(ethBalance);
    };

    const getWethBalance = async () => {
      const wethBalance = await fetchWethBalance(
        sdk,
        safe.safeAddress,
        safe.chainId
      );
      setWethBalance(wethBalance || "0");
    };

    getEthBalance();
    getWethBalance();
  }, [safe.chainId, safe.safeAddress, sdk, sdk.eth, sdk.safe]);

  return (
    <>
      <InputForm isWrap={true} balance={ethBalance} />
      <InputForm isWrap={false} balance={wethBalance} />
    </>
  );
}
