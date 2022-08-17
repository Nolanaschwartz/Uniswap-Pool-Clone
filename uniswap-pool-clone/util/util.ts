import { BigNumber } from "ethers";
import axios from "axios";
import CoinGecko from "coingecko-api";

export const formatUSD = (num: any) => {
  let number = num;
  if (BigNumber.isBigNumber(num)) {
    number = BigNumber.from(num).toNumber();
  }

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    notation: "compact",
  }).format(number);
};

export const tokenImageFetcher = async (tokenAddress: string) => {
  console.log("tokenImageFetcher", tokenAddress);
  const coinGeckoClient = new CoinGecko();
  const { data } = await coinGeckoClient.coins.fetchCoinContractInfo(
    tokenAddress
  );
  return data.image.small;
};
