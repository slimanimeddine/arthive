import { useContext } from "react";
import { SessionContext } from "@/providers/session-client-provider";

export function useSession() {
  return useContext(SessionContext);
}
