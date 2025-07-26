import { TAGS } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function useTag() {
  const [tag, setTag] = useQueryState("tag", parseAsStringLiteral(TAGS));

  return {
    tag,
    setTag,
  };
}
