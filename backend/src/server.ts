import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"; // Para usar async/await com tratamento de erros
import { router } from "./routes"; // Importação das rotas
import cors from "cors";
import "dotenv/config"
import path from "path";

const app = express();

// middleware para entender JSON
app.use(express.json());

// middleware para CORS
app.use(cors());

// as rotas são registradas aqui
app.use(router);

app.use(
  '/files', express.static(path.resolve(__dirname, '..', 'tmp'))
)

// middleware para tratar erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message, // Mensagem de erro
    });
  }


  // se o erro não for uma instância de Error, retorna erro genérico
  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});

// o servidor começa a rodar na porta 3333
app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
