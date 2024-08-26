import { z } from "zod";

export class SupplierValidation {
  static CREATE = z.object({
    name: z.string().min(1, "Name must at least 1").optional(),
    phone: z.string().min(1, "Phone must at least 1").optional(),
  });

  static UPDATE = this.CREATE.extend({
    id: z.string().min(1),
  });
}
