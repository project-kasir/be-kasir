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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from "@nestjs/swagger";

import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto, UpdateSupplierDto } from "./dto";
import { Roles } from "../common/decorators/roles.decorator";
import { PaginationReq, USER_ROLES } from "../common/types";
import { PaginationSchema } from "../common/zod";
import { ResponseService } from "../common/response/response.service";
import { SupplierValidation } from "./zod";
import {
  WebBadRequestErrorResponse,
  WebForbiddenErrorResponse,
  WebInternalServerErrorResponse,
  WebNotFoundErrorResponse,
  WebPayloadStringResponse,
  WebUnauthorizedErrorResponse,
} from "../common/response/base-response";
import { ValidationService } from "../common/validation/validation.service";
import {
  WebCreateSupplierResponse,
  WebGetAllSupplierResponse,
  WebGetSupplierByIdResponse,
  WebUpdateSupplierResponse,
} from "./response";

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
  @ApiOkResponse({ type: WebCreateSupplierResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<WebCreateSupplierResponse> {
    this.validationService.validate(
      SupplierValidation.CREATE,
      createSupplierDto,
    );
    const res = await this.suppliersService.create(createSupplierDto);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
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
  @ApiOkResponse({ type: WebGetAllSupplierResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  async getAll(@Query() pagination: PaginationReq) {
    const queryReq = this.validationService.validate(
      PaginationSchema,
      pagination,
    ) as PaginationReq;

    const res = await this.suppliersService.getAll(queryReq);
    return this.responseService.pagination(200, res.payload, res.meta);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebGetSupplierByIdResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get(":id")
  async getById(@Param("id") id: string) {
    const res = await this.suppliersService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateSupplierDto, ["id"]) })
  @ApiOkResponse({ type: WebUpdateSupplierResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
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
  @ApiOkResponse({ type: WebPayloadStringResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const res = await this.suppliersService.delete(id);
    return this.responseService.success(200, res);
  }
}
