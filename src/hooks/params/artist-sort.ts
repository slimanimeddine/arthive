import { ARTIST_SORT_VALUES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function useArtistSort() {
  const [artistSort, setArtistSort] = useQueryState(
    "artistSort",
    parseAsStringLiteral(ARTIST_SORT_VALUES),
  );

  return {
    artistSort,
    setArtistSort,
  };
}
