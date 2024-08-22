import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResponse<T> {
  @ApiProperty({ type: "number", example: 200 })
  status_code!: number;

  @ApiProperty()
  payload!: T;
}
