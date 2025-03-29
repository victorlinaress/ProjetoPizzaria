import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({ //service vai lidar com a requisição
            email,
            password
        });

        return res.json(auth); //retorna para o usuario
    }
}

export { AuthUserController };
