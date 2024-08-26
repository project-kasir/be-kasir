import { ApiProperty } from "@nestjs/swagger";

import {
  WebPaginationResponse,
  WebSuccessResponse,
} from "../../common/response/base-response";
import { SupplierEntity } from "../entity";

export class CreateSupplierResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  phone!: string;
}

export class UpdateSupplierResponse extends CreateSupplierResponse {}

export class WebCreateSupplierResponse extends WebSuccessResponse<CreateSupplierResponse> {
  @ApiProperty({ type: CreateSupplierResponse })
  payload!: CreateSupplierResponse;
}

export class WebUpdateSupplierResponse extends WebSuccessResponse<UpdateSupplierResponse> {
  @ApiProperty({ type: UpdateSupplierResponse })
  payload!: UpdateSupplierResponse;
}

export class WebGetAllSupplierResponse extends WebPaginationResponse<
  SupplierEntity[]
> {
  @ApiProperty({ type: [SupplierEntity] })
  payload!: SupplierEntity[];
}

export class WebGetSupplierByIdResponse extends WebSuccessResponse<SupplierEntity> {
  @ApiProperty({ type: SupplierEntity })
  payload!: SupplierEntity;
}
