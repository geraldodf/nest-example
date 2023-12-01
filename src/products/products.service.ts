import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  prisma = new PrismaClient();

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name: createProductDto.name ?? '',
        description: createProductDto.description ?? '',
        quantity: createProductDto.quantity ?? 1,
        price: createProductDto.price ?? 0.0,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
