import { ApiProperty } from "@nestjs/swagger";

export class SupplierDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  phone!: string;
}

export class CreateSupplierDto {
  @ApiProperty({ type: String, required: true })
  name!: string;

  @ApiProperty({ type: String, required: true })
  phone!: string;
}

export class UpdateSupplierDto {
  @ApiProperty({ type: Number, required: true })
  id!: string;

  @ApiProperty({ type: String, required: false })
  name?: string;

  @ApiProperty({ type: String, required: false })
  phone?: string;
}
