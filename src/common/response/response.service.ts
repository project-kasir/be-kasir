import { Injectable } from "@nestjs/common";
import { PaginationResponse } from "../types";
import { WebPaginationResponse, WebSuccessResponse } from "./base-response";

@Injectable()
export class ResponseService {
  success<T>(code: number, payload: T): WebSuccessResponse<T> {
    return {
      code,
      payload,
    };
  }

  pagination<T>(
    code: number,
    payload: T,
    meta: PaginationResponse,
  ): WebPaginationResponse<T> {
    return {
      code,
      payload,
      meta,
    };
  }
}
