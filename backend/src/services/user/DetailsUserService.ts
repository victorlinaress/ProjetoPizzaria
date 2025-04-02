import prismaClient from "../../prisma";

class DetailsUserService { //vai procurar o primeiro user_id no banco de dados
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select:{
                email:true,
                id: true,
                name: true
            }
        });
        
        return user;
    }
}

export default DetailsUserService;