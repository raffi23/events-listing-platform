import { z } from "zod";

export const eventQuerySchema = z
  .object({
    title: z.string(),
    location: z.string(),
    type: z.string(),
    starts_at: z.string().date(),
    expires_at: z.string().date(),
  })
  .partial();
