import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verificar se o email existe no banco
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User/password incorrect");
        }

        // verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);
        
        if (!passwordMatch) {
            throw new Error("Password incorrect");
        }

        return { ok: true };
    }
}

export { AuthUserService };
