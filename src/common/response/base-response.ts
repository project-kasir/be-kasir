import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponse } from "../types";

export abstract class WebSuccessResponse<T> {
  @ApiProperty({ type: Number, example: 200 })
  code!: number;

  @ApiProperty()
  payload!: T;
}

export abstract class WebPaginationResponse<T> extends WebSuccessResponse<T> {
  @ApiProperty({ type: PaginationResponse })
  meta!: PaginationResponse;
}

export abstract class PayloadStringResponse extends WebSuccessResponse<string> {
  @ApiProperty({ type: String, example: "success" })
  payload!: string;
}
