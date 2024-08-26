import { Logger } from "winston";
import { Category } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateCategoryResponse, UpdateCategoryResponse } from "./response";
import { CategoryEntity, CategoryNestedEntity } from "./entity";

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponse> {
    const category = await this.prismaService.category.create({
      data: createCategoryDto,
    });

    this.logger.info(`Category ${createCategoryDto.name} created successfully`);

    return category;
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await this.prismaService.category.findMany();
  }

  async getNested(): Promise<CategoryNestedEntity[]> {
    const categories = await this.prismaService.category.findMany();

    const categoryMap = new Map<string, any>();

    categories.forEach((category) => {
      categoryMap.set(category.id, {
        ...category,
        sub_categories: [],
      });
    });

    const rootCategories: CategoryEntity[] = [];

    categoryMap.forEach((category) => {
      if (category.parent_id) {
        const parentCategory = categoryMap.get(category.parent_id);
        if (parentCategory) {
          parentCategory.sub_categories.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }

  async getById(id: string): Promise<CategoryEntity> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResponse> {
    const existingCategory = (await this.getById(
      updateCategoryDto.id,
    )) as Category;

    const updateData: Partial<{
      name: string;
      parent_id: string | null;
    }> = {};

    if (updateCategoryDto.name) {
      updateData.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.parent_id !== undefined) {
      updateData.parent_id = updateCategoryDto.parent_id;
    }

    this.logger.info(`Update Category: ${existingCategory.name}`);

    const updatedCategory = await this.prismaService.category.update({
      where: { id: existingCategory.id },
      data: updateData,
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<string> {
    await this.prismaService.category.delete({
      where: { id },
    });

    return `Category with id ${id} has been deleted`;
  }
}
