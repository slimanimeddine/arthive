import { parseAsStringLiteral, useQueryState } from "nuqs";
import { COUNTRIES } from "@/lib/constants";

export function useCountry() {
  const [country, setCountry] = useQueryState(
    "country",
    parseAsStringLiteral(COUNTRIES),
  );

  return {
    country,
    setCountry,
  };
}
