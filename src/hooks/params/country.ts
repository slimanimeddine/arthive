import { COUNTRIES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

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
