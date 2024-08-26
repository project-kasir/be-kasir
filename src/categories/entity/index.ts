import { ApiProperty } from "@nestjs/swagger";

export class CategoryEntity {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String, nullable: true })
  parent_id?: string | null;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: Date })
  created_at!: Date;

  @ApiProperty({ type: Date })
  updated_at!: Date;
}

export class CategoryNestedEntity extends CategoryEntity {
  @ApiProperty({ type: [CategoryEntity] })
  sub_category?: CategoryEntity[];
}
