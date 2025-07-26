import { ARTWORK_SORT_VALUES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function useArtworkSort() {
  const [artworkSort, setArtworkSort] = useQueryState(
    "artworkSort",
    parseAsStringLiteral(ARTWORK_SORT_VALUES),
  );

  return {
    artworkSort,
    setArtworkSort,
  };
}
