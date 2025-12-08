import { parseAsStringLiteral, useQueryState } from "nuqs";
import { TAGS } from "@/lib/constants";

export function useTag() {
  const [tag, setTag] = useQueryState("tag", parseAsStringLiteral(TAGS));

  return {
    tag,
    setTag,
  };
}
