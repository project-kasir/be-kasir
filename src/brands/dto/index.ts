import { ApiProperty } from "@nestjs/swagger";

export class CreateBrandDto {
  @ApiProperty({ type: String, required: true })
  supplier_id!: string;

  @ApiProperty({ type: String, required: true })
  name!: string;
}

export class UpdateBrandDto {
  @ApiProperty({ type: Number, required: true })
  id!: string;

  @ApiProperty({ type: String, required: false })
  supplier_id?: string;

  @ApiProperty({ type: String, required: false })
  name?: string;
}
