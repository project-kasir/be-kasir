import { z } from "zod";
import { ApiProperty } from "@nestjs/swagger";

import { PaginationSchema } from "../zod";

export class PaginationResponse {
  @ApiProperty({ type: Number, default: 1 })
  page!: number;

  @ApiProperty({ type: Number, default: 10 })
  limit!: number;

  @ApiProperty({ type: Number, default: 1 })
  total_data!: number;

  @ApiProperty({ type: Number, default: 1 })
  total_page!: number;
}

export enum USER_ROLES {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type WithPagiation<T> = {
  meta: PaginationResponse;
  payload: T;
};

export type PaginationReq = z.infer<typeof PaginationSchema>;

export type UserClaims = {
  id: string;
  username: string;
  role: string;
};
