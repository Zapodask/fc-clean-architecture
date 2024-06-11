import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "product 1", 50);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "product 2",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });
});
