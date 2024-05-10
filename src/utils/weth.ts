import { WETH_ABI, WETH_CONTRACT_ADDRESS } from "@/config/constants";
import SafeAppsSDK, { BaseTransaction } from "@safe-global/safe-apps-sdk";
import { parseEther, encodeFunctionData } from "viem";

const appsSdk = new SafeAppsSDK();

export const unwrapEth = async (amount: string) => {
  if (!amount) return null;
  try {
    const wethContract = WETH_CONTRACT_ADDRESS["11155111"];
    const value = parseEther("0").toString();
    const data = encodeFunctionData({
      abi: WETH_ABI,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });

    const tx: BaseTransaction = {
      to: wethContract,
      value,
      data,
    };
    await appsSdk.txs.send({ txs: [tx] });
  } catch (error) {
    console.error(error);
  }
};

export const wrapEth = async (amount: string) => {
  if (!amount) return null;
  try {
    const wethContract = WETH_CONTRACT_ADDRESS["11155111"];
    const amountInWei = parseEther(amount);

    const tx: BaseTransaction = {
      to: wethContract,
      value: amountInWei.toString(),
      data: encodeFunctionData({
        abi: WETH_ABI,
        functionName: "deposit",
      }),
    };
    await appsSdk.txs.send({ txs: [tx] });
  } catch (error) {
    console.error(error);
  }
};
