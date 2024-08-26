import { ApiProperty } from "@nestjs/swagger";

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
