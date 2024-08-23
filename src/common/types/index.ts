import { z } from "zod";
import { PaginationSchema } from "../zod";

export enum USER_ROLES {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type PaginationReq = z.infer<typeof PaginationSchema>;

export type UserClaims = {
  id: string;
  username: string;
  role: string;
};
