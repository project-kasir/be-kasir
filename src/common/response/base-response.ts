import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResponse<T> {
  @ApiProperty({ type: "number", example: 200 })
  code!: number;

  @ApiProperty()
  payload!: T;
}

export class SuccessResponse {
  @ApiProperty({ type: "number", example: 200 })
  code!: number;

  @ApiProperty({ type: String, example: "success" })
  payload!: string;
}
