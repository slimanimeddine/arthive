import { SessionContext } from "@/providers/session-client-provider";
import { useContext } from "react";

export function useSession() {
  return useContext(SessionContext);
}
