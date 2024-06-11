import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(uuid(), input.name, input.price);
    await this.productRepository.create(product);
    return OutputMapper.toOutput(product);
  }
}

class OutputMapper {
  static toOutput(product: Product): OutputCreateProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
