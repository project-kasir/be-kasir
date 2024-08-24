import { Logger } from "winston";
import { Prisma, Supplier } from "@prisma/client";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

import { CreateSupplierDto, UpdateSupplierDto } from "./dto";
import { PrismaService } from "../common/prisma/prisma.service";
import { PaginationReq, WithPagiation } from "../common/types";
import { CreateSupplierResponse, UpdateSupplierResponse } from "./response";

@Injectable()
export class SuppliersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    createSupplierDto: CreateSupplierDto,
  ): Promise<CreateSupplierResponse> {
    const supplier = await this.prismaService.supplier.create({
      data: createSupplierDto,
    });

    this.logger.info(`Supplier ${createSupplierDto.name} created successfully`);

    return supplier;
  }

  async getAll(
    paginationReq: PaginationReq,
  ): Promise<WithPagiation<Supplier[]>> {
    const skip = (paginationReq.page - 1) * paginationReq.size;

    const [payload, total] = await this.prismaService.$transaction([
      this.prismaService.supplier.findMany({
        include: {
          brands: true,
        },
        orderBy: {
          name: "asc",
        },
        take: paginationReq.size,
        skip,
      }),
      this.prismaService.supplier.count(),
    ]);

    return {
      payload,
      meta: {
        current_page: paginationReq.page,
        size: paginationReq.size,
        total_page: Math.ceil(total / paginationReq.size),
      },
    };
  }

  async getById(
    id: string,
  ): Promise<Prisma.SupplierGetPayload<{ include: { brands: true } }> | null> {
    return this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        brands: true,
      },
    });
  }

  async update(
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<UpdateSupplierResponse> {
    const existingSupplier = (await this.getById(
      updateSupplierDto.id,
    )) as Supplier;

    const updateData: Partial<Supplier> = {};

    if (updateSupplierDto.name) {
      updateData.name = updateSupplierDto.name;
    }

    if (updateSupplierDto.phone !== undefined) {
      updateData.phone = updateSupplierDto.phone;
    }

    this.logger.info(`Update Supplier: ${existingSupplier.name}`);

    const updatedSupplier = await this.prismaService.supplier.update({
      where: { id: existingSupplier.id },
      data: updateData,
    });

    return updatedSupplier;
  }

  async delete(id: string): Promise<string> {
    const supplier = await this.getById(id);

    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }

    await this.prismaService.supplier.delete({
      where: { id },
    });

    return `Supplier with id ${id} has been deleted`;
  }
}
