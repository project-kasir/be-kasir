import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../common/response/base-response";

class SupplierPayload {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  phone!: string;
}

export class SupplierResponse extends BaseResponse<SupplierPayload, string> {
  @ApiProperty({ type: SupplierPayload })
  payload!: SupplierPayload;
}
