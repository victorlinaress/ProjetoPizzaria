import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    console.log(req.body); 
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      return res.json(user);  // Se tudo ocorrer bem, retorna o usuário
    } catch (error) {
      console.error(error);  // Aqui você captura e loga o erro
      return res.status(500).json({
        error: error.message,  // Retorna uma resposta com o erro
      });
    }
  }
}

export { CreateUserController };
