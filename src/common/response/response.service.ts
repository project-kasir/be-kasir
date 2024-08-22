import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseService {
  success(code: number, message: string, payload: any) {
    return {
      code,
      message,
      payload,
    };
  }

  pagination(code: number, message: string, payload: any, meta: any) {
    return {
      code,
      message,
      payload,
      meta,
    };
  }
}
