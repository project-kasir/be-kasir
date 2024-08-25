import { ApiProperty } from "@nestjs/swagger";
import {
  WebPaginationResponse,
  WebSuccessResponse,
} from "../../common/response/base-response";
import { SupplierDto } from "../dto";

export class CreateSupplierResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: Number })
  phone!: number;
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
  SupplierDto[]
> {
  @ApiProperty({ type: [SupplierDto] })
  payload!: SupplierDto[];
}

export class WebGetSupplierByIdResponse extends WebSuccessResponse<SupplierDto> {
  @ApiProperty({ type: SupplierDto })
  payload!: SupplierDto;
}
