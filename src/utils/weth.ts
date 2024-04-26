import { WETH_ADDRESS } from "@/config/constants";
import { Interface, type JsonRpcProvider } from "ethers";
import SafeAppsSDK from "@safe-global/safe-apps-sdk";

const wrapEthInterface = new Interface([
  "function getBalance(address)",
  "function withdraw(uint32)",
]);

const appsSdk = new SafeAppsSDK();

/**
 * Returns total tokens in the locking contract including locked and unlocked amounts.
 *
 * @param chainId
 * @param safeAddress
 * @param provider
 * @returns total token balance
 */
export const fetchWethBalance = async (
  chainId: string,
  safeAddress: string,
  provider: JsonRpcProvider
) => {
  const wethAddress = WETH_ADDRESS[chainId];

  if (!wethAddress) {
    return "0";
  }

  try {
    return await provider.call({
      to: wethAddress,
      data: wrapEthInterface.encodeFunctionData("getBalance", [safeAddress]),
    });
  } catch (err) {
    throw Error(`Error fetching Weth balance:  ${err}`);
  }
};
