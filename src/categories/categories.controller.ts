import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from "@nestjs/swagger";
import { ResponseService } from "src/common/response/response.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { USER_ROLES } from "src/common/types";
import { ValidationService } from "src/common/validation/validation.service";
import { CategoryValidation } from "./zod";
import { Public } from "src/common/decorators/public.decorator";
import { CategoryResponse } from "./response";
import { SuccessResponse } from "src/common/response/base-response";

@ApiTags("Categories")
@Controller("/v1/categories")
export class CategoriesController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly responseService: ResponseService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @HttpCode(201)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ type: CategoryResponse })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    this.validationService.validate(
      CategoryValidation.CREATE,
      createCategoryDto,
    );
    const res = await this.categoriesService.create(createCategoryDto);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @Public()
  @ApiOkResponse({ type: [CategoryResponse] })
  @Get()
  async getAll() {
    const res = await this.categoriesService.getAll();
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @Public()
  @ApiOkResponse({ type: CategoryResponse })
  @Get(":id")
  async getById(@Param("id") id: string) {
    const res = await this.categoriesService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateCategoryDto, ["id"]) })
  @ApiOkResponse({ type: CategoryResponse })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    updateCategoryDto.id = id;
    this.validationService.validate(
      CategoryValidation.UPDATE,
      updateCategoryDto,
    );
    const res = await this.categoriesService.update(updateCategoryDto);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: SuccessResponse })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    const res = await this.categoriesService.delete(id);
    return this.responseService.success(200, res);
  }
}
