import { TAGS } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function useCategory() {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsStringLiteral(TAGS),
  );
  return {
    category,
    setCategory,
  };
}
