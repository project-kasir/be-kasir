import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponse } from "../types";

export abstract class WebSuccessResponse<T> {
  @ApiProperty({ type: Number, example: 200 })
  code!: number;

  payload!: T;
}

export abstract class WebErrorResponse {
  code!: number;

  erros!: string;
}

export class WebPaginationResponse<T> extends WebSuccessResponse<T> {
  @ApiProperty({ type: PaginationResponse })
  meta!: PaginationResponse;
}

export class WebPayloadStringResponse extends WebSuccessResponse<string> {
  @ApiProperty({ type: String, example: "success" })
  payload!: string;
}

// Swagger docs

export class WebBadRequestErrorResponse extends WebErrorResponse {
  @ApiProperty({ type: Number, example: 400 })
  code!: number;

  @ApiProperty({ type: String, example: "Bad Request" })
  errors!: string;
}

export class WebUnauthorizedErrorResponse extends WebErrorResponse {
  @ApiProperty({ type: Number, example: 401 })
  code!: number;

  @ApiProperty({ type: String, example: "Unauthorized" })
  errors!: string;
}

export class WebForbiddenErrorResponse extends WebErrorResponse {
  @ApiProperty({ type: Number, example: 403 })
  code!: number;

  @ApiProperty({ type: String, example: "Forbidden" })
  errors!: string;
}

export class WebNotFoundErrorResponse extends WebErrorResponse {
  @ApiProperty({ type: Number, example: 404 })
  code!: number;

  @ApiProperty({ type: String, example: "Not Found" })
  errors!: string;
}

export class WebInternalServerErrorResponse extends WebErrorResponse {
  @ApiProperty({ type: Number, example: 500 })
  code!: number;

  @ApiProperty({ type: String, example: "Internal Server Error" })
  errors!: string;
}
