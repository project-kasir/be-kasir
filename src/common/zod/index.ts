import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.number().optional().default(1),
  size: z.number().optional().default(10),
});
