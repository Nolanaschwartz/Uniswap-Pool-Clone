import { BigNumber } from "ethers";
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
    // notation: "compact",
  }).format(number);
};

export const tokenImageFetcher = async (tokenAddress: string) => {
  const coinGeckoClient = new CoinGecko();
  const { data } = await coinGeckoClient.coins.fetchCoinContractInfo(
    tokenAddress
  );
  return data.image.small;
};
