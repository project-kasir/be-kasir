import { ApiProperty } from "@nestjs/swagger";

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
