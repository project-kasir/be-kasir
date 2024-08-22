import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../common/response/base-response";

class CategoryPayload {
  @ApiProperty({ type: "string" })
  id!: string;

  @ApiProperty({ type: "string" })
  parent_id?: string;

  @ApiProperty({ type: "string" })
  name!: string;
}

export class CategoryResponse extends BaseResponse<CategoryPayload, string> {
  @ApiProperty({ type: CategoryPayload })
  payload!: CategoryPayload;
}
