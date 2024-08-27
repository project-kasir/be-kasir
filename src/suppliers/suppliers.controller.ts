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
import { CreateSupplierDto, SupplierQueryDto, UpdateSupplierDto } from "./dto";
import { Roles } from "../common/decorators/roles.decorator";
import { USER_ROLES } from "../common/types";
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
    const createReq = this.validationService.validate(
      SupplierValidation.CREATE,
      createSupplierDto,
    );
    const res = await this.suppliersService.create(createReq);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiQuery({
    name: "page",
    type: Number,
    example: 1,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    example: 10,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "name",
    type: String,
    required: false,
    allowReserved: true,
  })
  @ApiOkResponse({ type: WebGetAllSupplierResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get()
  async getAll(
    @Query() query: SupplierQueryDto,
  ): Promise<WebGetAllSupplierResponse> {
    const queryReq = this.validationService.validate(SupplierValidation.QUERY, {
      limit: +query.limit ?? 10,
      page: +query.page ?? 1,
      name: query.name,
    }) as SupplierQueryDto;

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
  async getById(@Param("id") id: string): Promise<WebGetSupplierByIdResponse> {
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
  ): Promise<WebUpdateSupplierResponse> {
    updateSupplierDto.id = id;
    const updateReq = this.validationService.validate(
      SupplierValidation.UPDATE,
      updateSupplierDto,
    );
    const res = await this.suppliersService.update(updateReq);
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
  async remove(@Param("id") id: string): Promise<WebPayloadStringResponse> {
    const res = await this.suppliersService.delete(id);
    return this.responseService.success(200, res);
  }
}
