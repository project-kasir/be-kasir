import { z } from "zod";

export class SupplierValidation {
  static CREATE = z.object({
    name: z.string().min(1, "Name must be a string").optional(),
    phone: z.number().min(1, "Phone must be a number").optional(),
  });

  static UPDATE = this.CREATE.extend({
    id: z.string().min(1),
  });
}
