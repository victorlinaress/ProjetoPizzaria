import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API funcionando corretamente!" });
});

router.post("/dados", (req, res) => {
  const { nome, email } = req.body;
  res.json({ message: "Dados recebidos!", nome, email });
});

export default router;
