import prismaClient from "../../prisma";
class DetailUserService {
    async execute(user_id:string) {
        const userIdAsInt = parseInt(user_id, 10);
        const user = await prismaClient.usuario.findFirst({
            where:{
                usuarioID:userIdAsInt
            },
            select:{
                usuarioID:true,
                emailUsuario:true,
                papel: {
                    select:{
                        nomePapel:true,
                        nivelPapel:true
                    }
                }
            }
        })
        return user;
    }
}
export { DetailUserService }