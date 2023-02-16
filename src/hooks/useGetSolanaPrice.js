import { useEffect, useState } from "react";

const SOLANA_PRICE_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";

export const useGetSolanaPrice = ()=> {
  const [solInUsd, setSolInUsd] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(SOLANA_PRICE_API_URL);
      const solPrice =
        ((await response.json())?.solana?.usd ) || 0;
      setSolInUsd(solPrice);
    })();
  }, [setSolInUsd]);

  return solInUsd;
};
