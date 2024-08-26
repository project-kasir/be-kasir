import { ApiProperty } from "@nestjs/swagger";

export class BrandEntity {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  supplier_id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: Date })
  created_at!: Date;

  @ApiProperty({ type: Date })
  updated_at!: Date;
}
