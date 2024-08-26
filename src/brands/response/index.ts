import { ApiProperty } from "@nestjs/swagger";

import {
  WebPaginationResponse,
  WebSuccessResponse,
} from "../../common/response/base-response";
import { BrandEntity } from "../entity";

export class WebCreateBrandResponse extends WebSuccessResponse<BrandEntity> {
  @ApiProperty({ type: BrandEntity })
  payload!: BrandEntity;
}

export class WebUpdateBrandResponse extends WebSuccessResponse<BrandEntity> {
  @ApiProperty({ type: BrandEntity })
  payload!: BrandEntity;
}

export class WebGetAllSupplierResponse extends WebPaginationResponse<
  BrandEntity[]
> {
  @ApiProperty({ type: [BrandEntity] })
  payload!: BrandEntity[];
}

export class WebGetSupplierByIdResponse extends WebSuccessResponse<BrandEntity> {
  @ApiProperty({ type: BrandEntity })
  payload!: BrandEntity;
}
