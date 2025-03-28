import prismaClient from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        console.log(name);

        //verificar se enviou um email
        if (!email){
            throw new Error("Email Incorrect") 
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User already exists")
        }

        const user = await prismaClient.user.create({
            data:{
                name:name,
                email: email,
                password: password
            }
        })
        return user;
    }
}

export { CreateUserService };
