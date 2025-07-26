import { parseAsString, useQueryState } from "nuqs";

export function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "searchQuery",
    parseAsString.withDefault(""),
  );

  return {
    searchQuery,
    setSearchQuery,
  };
}
