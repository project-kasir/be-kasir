import { PaginationSchema } from "../../common/zod";
import { z } from "zod";

export class SupplierValidation {
  static CREATE = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
  });

  static UPDATE = this.CREATE.extend({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    id: z.string().min(1),
  });

  static QUERY = PaginationSchema.extend({
    name: z.string().min(1).optional(),
  });
}
