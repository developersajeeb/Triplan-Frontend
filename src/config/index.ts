export const config = {
  baseUrl: import.meta.env.VITE_BASE_URL,
};

export const OtpExpireTimeInSeconds: number = 600;

export const CURRENCY = {
  code: (import.meta.env.VITE_CURRENCY_CODE as string) ?? "BDT",
  symbol: (import.meta.env.VITE_CURRENCY_SYMBOL as string) ?? "৳",
};

export const formatCurrency = (value: number | string | undefined | null) => {
  if (value === undefined || value === null) return `${CURRENCY.symbol}0`;
  return `${CURRENCY.symbol}${value}`;
};