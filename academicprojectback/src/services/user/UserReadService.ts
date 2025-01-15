import prismaClient from "../../prisma";
interface UserRequest {
    emailUsuario: string;
}
class UserReadService {
    async execute({ emailUsuario }: UserRequest) {
        if (!emailUsuario) {
            return {
                error: true,
                message: "O email é obrigatório."
            };
        }

        const user = await prismaClient.usuario.findFirst({
            where: {
                emailUsuario: emailUsuario
            },
            select:{
                emailUsuario:true
            }
        })
        return user;
    }
}
export { UserReadService }