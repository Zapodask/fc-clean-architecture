import express, { Request, Response } from "express";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post(
  "/",
  async (req: Request<InputCreateProductDto>, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const output = await usecase.execute(req.body);

    res.send(output);
  }
);

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});
