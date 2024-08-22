import { z } from "zod";

export class CategoryValidation {
  static CREATE = z.object({
    parent_id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
  });

  static UPDATE = this.CREATE.extend({
    id: z.string().min(1),
  });
}
