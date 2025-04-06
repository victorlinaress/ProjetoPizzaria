import { Request, Response } from "express";
import { ListByCategories } from "../../services/product/ListByCategoriesService";

class ListByCategoriesController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string; // pega o parâmetro category_id da query da URL e força o tipo como string


    const listByCategories = new ListByCategories();

    const products = await listByCategories.execute({
      category_id,
    });

    return res.json(products);
  }
}

export { ListByCategoriesController };
