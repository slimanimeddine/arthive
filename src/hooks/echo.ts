/* eslint-disable @typescript-eslint/no-unsafe-call */
import Echo, { type Broadcaster } from "laravel-echo";
import { useEffect, useState } from "react";
import { env } from "@/env/client";
import { axiosInstance } from "@/lib/axios";
import Pusher from "pusher-js";

interface Authorizer {
  authorize: (socketId: string, callback: CallableFunction) => void;
}

export function useEcho(token: string) {
  const [echoInstance, setEchoInstance] = useState<Echo<keyof Broadcaster>>();

  useEffect(() => {
    if (!token) {
      return;
    }
    const echo = new Echo({
      broadcaster: "reverb",
      Pusher,
      encrypted: true,
      key: env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel: { name: string }): Authorizer => {
        return {
          authorize: (socketId: string, callback: CallableFunction) => {
            axiosInstance
              .post(
                "/api/broadcasting/auth",
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              )

              .then((response) => {
                callback(false, response.data);
              })

              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
      wsHost: env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: env.NEXT_PUBLIC_REVERB_PORT,
      wssPort: env.NEXT_PUBLIC_REVERB_PORT,
      forceTLS: (env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
    });

    setEchoInstance(echo);
  }, [token]);

  return echoInstance;
}
