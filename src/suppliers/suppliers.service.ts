import { Logger } from "winston";
import { Prisma, Supplier } from "@prisma/client";
import { Inject, Injectable } from "@nestjs/common";
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
  ): Promise<
    WithPagiation<Prisma.SupplierGetPayload<{ include: { brands: true } }>[]>
  > {
    const skip = (paginationReq.page - 1) * paginationReq.limit;

    const [payload, total] = await this.prismaService.$transaction([
      this.prismaService.supplier.findMany({
        include: {
          brands: true,
        },
        orderBy: {
          name: "asc",
        },
        take: paginationReq.limit,
        skip,
      }),
      this.prismaService.supplier.count(),
    ]);

    return {
      payload,
      meta: {
        page: paginationReq.page,
        limit: paginationReq.limit,
        total_data: total,
        total_page: Math.ceil(total / paginationReq.limit),
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
    const updateData: Partial<Supplier> = {};

    if (updateSupplierDto.name) {
      updateData.name = updateSupplierDto.name;
    }

    if (updateSupplierDto.phone !== undefined) {
      updateData.phone = updateSupplierDto.phone;
    }

    const updatedSupplier = await this.prismaService.supplier.update({
      where: { id: updateSupplierDto.id },
      data: updateData,
    });

    this.logger.info(`Update Supplier: ${updateSupplierDto.id}`);

    return updatedSupplier;
  }

  async delete(id: string): Promise<string> {
    await this.prismaService.supplier.delete({
      where: { id },
    });

    return `Supplier with id ${id} has been deleted`;
  }
}
