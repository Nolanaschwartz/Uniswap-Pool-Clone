import { BigNumber } from "ethers";

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
