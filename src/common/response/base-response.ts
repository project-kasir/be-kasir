import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResponse<T, V> {
  @ApiProperty({ type: "number", example: 200 })
  code!: number;

  @ApiProperty()
  payload!: T;

  @ApiProperty({ type: "string", example: "Success" })
  message!: V;
}

export class SuccessResponse {
  @ApiProperty({ type: "number", example: 200 })
  code!: number;

  @ApiProperty({ type: String, example: "success" })
  payload!: string;
}
