import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import DetailsUserController from "./controllers/user/DetailsUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/user/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/user/category/ListCategoryController";

const router = Router();

// Rotas de usuário
router.post("/users", async (req, res) => {
  return await new CreateUserController().handle(req, res);
});

router.post("/session", async (req, res) => {
  return await new AuthUserController().handle(req, res);
});

router.get("/me", isAuthenticated, async (req, res) => {
  return await new DetailsUserController().handle(req, res);
});

// Rotas de categoria
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category", isAuthenticated, new ListCategoryController().handle);

export { router };
