import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../common/response/base-response";

class CategoryPayload {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  parent_id?: string;

  @ApiProperty({ type: String })
  name!: string;
}

export class CategoryResponse extends BaseResponse<CategoryPayload, string> {
  @ApiProperty({ type: CategoryPayload })
  payload!: CategoryPayload;
}
