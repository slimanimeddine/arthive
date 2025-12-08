import { parseAsStringLiteral, useQueryState } from "nuqs";
import { TAGS } from "@/lib/constants";

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
