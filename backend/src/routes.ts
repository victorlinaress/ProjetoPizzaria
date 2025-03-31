import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import DetailsUserController from "./controllers/user/DetailsUserController";

const router = Router();

// Definição das rotas
router.post("/users", async (req, res) => {
  return await new CreateUserController().handle(req, res);
});

router.post("/session", async (req, res) => {
  return await new AuthUserController().handle(req, res);
});

router.get("/me", isAuthenticated, async (req, res) => {
  return await new DetailsUserController().handle(req, res);
});

export { router };
