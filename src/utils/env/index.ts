import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.string(),
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
});

const parsedEnv = envSchema.safeParse({
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

if (!parsedEnv.success) {
    console.error("Invalid environment variables", parsedEnv.error.format());
    throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
