import { z } from "zod";

export class UsersValidation {
  static LOGIN = z.object({
    username: z.string().min(3).max(15),
    password: z.string(),
  });

  static RESGISTER = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(8),
  });
}
