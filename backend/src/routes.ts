import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import DetailsUserController from "./controllers/user/DetailsUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoriesController } from "./controllers/product/ListProductController";
import { CreateOrderController } from "./controllers/orders/CreateOrderController";

import multer from "multer";
import uploadConfig from "./config/multer";
import { RemoveOrderController } from "./controllers/orders/RemoveOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

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
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas de produto
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoriesController().handle
);

//Rotas Order

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("delete", isAuthenticated, new RemoveOrderController().handle);

export { router };
