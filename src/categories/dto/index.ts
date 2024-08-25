import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String, nullable: true })
  parent_id?: string | null;

  @ApiProperty({ type: String })
  name!: string;
}

export class CreateCategoryDto {
  @ApiProperty({ type: String })
  parent_id!: string;

  @ApiProperty({ type: String, required: true })
  name!: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ type: String })
  id!: string;
}
