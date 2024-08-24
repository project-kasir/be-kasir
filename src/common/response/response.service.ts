import { Injectable } from "@nestjs/common";
import { PaginationResponse } from "../types";

@Injectable()
export class ResponseService {
  success(code: number, payload: any) {
    return {
      code,
      payload,
    };
  }

  pagination(code: number, payload: any, meta: PaginationResponse) {
    return {
      code,
      payload,
      meta,
    };
  }
}
