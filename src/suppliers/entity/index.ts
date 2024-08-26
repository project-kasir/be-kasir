import { ApiProperty, OmitType } from "@nestjs/swagger";
import { BrandEntity } from "src/brands/entity";

export class SupplierEntity {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  phone!: string;

  @ApiProperty({ type: Date })
  created_at!: Date;

  @ApiProperty({ type: Date })
  updated_at!: Date;

  @ApiProperty({ type: [OmitType(BrandEntity, ["supplier_id"])] })
  brands?: Omit<BrandEntity, "supplier_id">[];
}
