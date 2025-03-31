import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken"; 

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


        //se deu certo, vamos gerar um token para o usuaruio

        const token = sign (
            {
                name: user.name,
                email: user.email

        },
        process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        }
     )

     return { //retorna para o usuario
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
     }
        return { ok: true };
    }
}



export { AuthUserService };
