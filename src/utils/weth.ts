import { WETH_ABI, WETH_CONTRACT_ADDRESS } from "@/config/constants";
// import { Interface, parseEther, type JsonRpcProvider } from "ethers";
import SafeAppsSDK, { BaseTransaction } from "@safe-global/safe-apps-sdk";
import {
  parseEther,
  encodeFunctionData,
  fromHex,
  formatEther,
  getAddress,
} from "viem";

// const wrapEthInterface = new Interface([
//   "function getBalance(address)",
//   "function withdraw(uint32)",
//   "function deposit(uint32)",
// ]);

const appsSdk = new SafeAppsSDK();

/**
 * Returns total tokens in the locking contract including locked and unlocked amounts.
 *
 * @param chainId
 * @param safeAddress
 * @param provider
 * @returns total token balance
 */
// export const fetchWethBalance = async (
//   chainId: string,
//   safeAddress: string,
//   provider: JsonRpcProvider
// ) => {
//   const wethAddress = WETH_CONTRACT_ADDRESS[chainId];

//   if (!wethAddress) {
//     return "0";
//   }

//   try {
//     return await provider.call({
//       to: wethAddress,
//       data: wrapEthInterface.encodeFunctionData("getBalance", [safeAddress]),
//     });
//   } catch (err) {
//     throw Error(`Error fetching Weth balance:  ${err}`);
//   }
// };

export const unwrapEth = async (amount: string) => {
  if (!amount) return null;
  const wethContract = WETH_CONTRACT_ADDRESS["11155111"];
  // const amountInWei = parseEther(amount);
  // const amountInWei = parseEther(amount);
  const value = parseEther("0").toString();
  // const data = encodeFunctionData("withdraw", []);
  const data = encodeFunctionData({
    abi: WETH_ABI,
    functionName: "withdraw",
    args: [parseEther(amount)],
  });

  // const txValue = isWrap ? amountInWei.toString() : ethers.utils.parseEther('0').toString()

  const tx: BaseTransaction = {
    to: wethContract,
    value,
    data,
  };
  await appsSdk.txs.send({ txs: [tx] });
};

export const wrapEth = async (amount: string) => {
  if (!amount) return null;
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
};

export const fetchWethBalance = async (
  sdk: SafeAppsSDK,
  address: string,
  chainId: number
) => {
  if (!address) return;
  const wethContractAddress = WETH_CONTRACT_ADDRESS[chainId];
  const data = encodeFunctionData({
    abi: WETH_ABI,
    functionName: "balanceOf",
    args: [getAddress(address)],
  });
  const config = {
    from: "0x0000000000000000000000000000000000000000",
    to: wethContractAddress,
    data: data,
  };
  const result = await sdk.eth.call([config]);
  const weiBalance = fromHex(result as `0x${string}`, "bigint");
  const wethBalance = formatEther(weiBalance);
  return wethBalance;
};
