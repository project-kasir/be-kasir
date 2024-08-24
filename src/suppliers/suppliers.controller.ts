import { ValidationService } from "./../common/validation/validation.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from "@nestjs/common";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto, UpdateSupplierDto } from "./dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  OmitType,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { PaginationReq, USER_ROLES, WithPagiation } from "../common/types";
import { Public } from "../common/decorators/public.decorator";
import { PaginationSchema } from "../common/zod";
import { ResponseService } from "../common/response/response.service";
import { SupplierValidation } from "./zod";
import { WebSuccessResponse } from "src/common/response/base-response";
import { CreateSupplierResponse, UpdateSupplierResponse } from "./response";
import { Prisma, Supplier } from "@prisma/client";

@ApiTags("Suppliers")
@Controller("/v1/suppliers")
export class SuppliersController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly responseService: ResponseService,
    private readonly suppliersService: SuppliersService,
  ) {}

  @HttpCode(201)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: CreateSupplierDto })
  @ApiOkResponse({ type: WebSuccessResponse<CreateSupplierResponse> })
  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<WebSuccessResponse<CreateSupplierResponse>> {
    this.validationService.validate(
      SupplierValidation.CREATE,
      createSupplierDto,
    );
    const res = await this.suppliersService.create(createSupplierDto);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @Public()
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "size",
    type: Number,
    required: false,
    allowReserved: true,
  })
  @ApiOkResponse({ type: WebSuccessResponse<WithPagiation<Supplier[]>> })
  async getAll(@Query() pagination: PaginationReq) {
    const queryReq = this.validationService.validate(
      PaginationSchema,
      pagination,
    ) as PaginationReq;

    const res = await this.suppliersService.getAll(queryReq);
    return this.responseService.pagination(200, res.payload, res.meta);
  }

  @HttpCode(200)
  @Public()
  @ApiOkResponse({
    type: WebSuccessResponse<
      Prisma.SupplierGetPayload<{
        include: {
          brands: true;
        };
      }>
    >,
  })
  @Get(":id")
  async getById(@Param("id") id: string) {
    const res = await this.suppliersService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateSupplierDto, ["id"]) })
  @ApiOkResponse({ type: WebSuccessResponse<UpdateSupplierResponse> })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    updateSupplierDto.id = id;
    this.validationService.validate(
      SupplierValidation.UPDATE,
      updateSupplierDto,
    );
    const res = await this.suppliersService.update(updateSupplierDto);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebSuccessResponse<string> })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const res = await this.suppliersService.delete(id);
    return this.responseService.success(200, res);
  }
}
