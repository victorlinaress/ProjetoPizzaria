import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import DetailsUserController from "./controllers/user/DetailsUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/user/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/user/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router();

// rotas de usuário
router.post("/users", async (req, res) => {
  return await new CreateUserController().handle(req, res);
});

router.post("/session", async (req, res) => {
  return await new AuthUserController().handle(req, res);
});

router.get("/me", isAuthenticated, async (req, res) => {
  return await new DetailsUserController().handle(req, res);
});

// rotas de categoria
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get("/category", isAuthenticated, new ListCategoryController().handle);

//rotas de produto

router.post(/'product', isAuthenticated, new CreateProductController().handle)


export { router };
