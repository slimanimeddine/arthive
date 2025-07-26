import { parseAsInteger, useQueryState } from "nuqs";

export function usePage() {
  const [page, setPage] = useQueryState("page", parseAsInteger);
  return {
    page,
    setPage,
  };
}
