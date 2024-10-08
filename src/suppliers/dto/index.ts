import { ApiProperty } from "@nestjs/swagger";
import { SupplierValidation } from "../zod";
import { z } from "zod";

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

export type SupplierQueryDto = z.infer<typeof SupplierValidation.QUERY>;
