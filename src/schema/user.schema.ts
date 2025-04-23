import {z} from "zod";

export const extensionSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  days: z.number().min(1, "Must request at least 1 day"),
});
