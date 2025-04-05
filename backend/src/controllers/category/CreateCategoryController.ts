import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, rep: Response) {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
    });

    return rep.json(category);
  }
}

export { CreateCategoryController };
