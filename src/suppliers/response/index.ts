import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: Number })
  phone!: number;
}

export class UpdateSupplierResponse extends CreateSupplierResponse {}
