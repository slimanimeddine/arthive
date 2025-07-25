import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.url().default("http://localhost:8000"),
    NEXT_PUBLIC_REVERB_APP_ID: z.string(),
    NEXT_PUBLIC_REVERB_APP_KEY: z.string(),
    NEXT_PUBLIC_REVERB_APP_SECRET: z.string(),
    NEXT_PUBLIC_REVERB_HOST: z.string(),
    NEXT_PUBLIC_REVERB_PORT: z.preprocess(
      (val) => Number(val),
      z.number().int().min(1).max(65535),
    ),
    NEXT_PUBLIC_REVERB_SCHEME: z.enum(["http", "https"]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_REVERB_APP_ID: process.env.NEXT_PUBLIC_REVERB_APP_ID,
    NEXT_PUBLIC_REVERB_APP_KEY: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    NEXT_PUBLIC_REVERB_APP_SECRET: process.env.NEXT_PUBLIC_REVERB_APP_SECRET,
    NEXT_PUBLIC_REVERB_HOST: process.env.NEXT_PUBLIC_REVERB_HOST,
    NEXT_PUBLIC_REVERB_PORT: process.env.NEXT_PUBLIC_REVERB_PORT,
    NEXT_PUBLIC_REVERB_SCHEME: process.env.NEXT_PUBLIC_REVERB_SCHEME,
  },
});
