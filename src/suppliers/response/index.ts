import { ApiProperty } from "@nestjs/swagger";

import {
  WebPaginationResponse,
  WebSuccessResponse,
} from "../../common/response/base-response";
import { SupplierEntity } from "../entity";

export class WebCreateSupplierResponse extends WebSuccessResponse<SupplierEntity> {
  @ApiProperty({ type: SupplierEntity })
  payload!: SupplierEntity;
}

export class WebUpdateSupplierResponse extends WebSuccessResponse<SupplierEntity> {
  @ApiProperty({ type: SupplierEntity })
  payload!: SupplierEntity;
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
