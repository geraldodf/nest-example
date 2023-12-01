import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        quantity: createProductDto.quantity,
        price: createProductDto.price,
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id },
      });
      return `Product with id ${id} deleted successfully: ${JSON.stringify(
        deletedProduct,
      )}`;
    } catch (error) {
      throw new Error(
        `Unable to delete product with id ${id}: ${error.message}`,
      );
    }
  }
}
