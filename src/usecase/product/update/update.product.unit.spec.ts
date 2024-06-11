import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "product 1", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "product 2",
      price: 200,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "",
      price: 100,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should thrown an error when price is smaller than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "product 1",
      price: -1,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "product: Price must be greater or equal to 0"
    );
  });
});
