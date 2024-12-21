import prismaClient from '../../prisma'
import { hash } from 'bcryptjs';
interface UserRequest {
    emailUsuario: string;
    senhaUsuario: string;
    papelID: number
}
class CreateUserService {
    async execute({ emailUsuario, senhaUsuario, papelID }: UserRequest) {
        if (!emailUsuario || !senhaUsuario || !papelID) {
            throw new Error("O email/senha e Papel  são obrigatórios")
        }
        //Verifica se email ja foi cadastrado anteriormente
        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                emailUsuario: emailUsuario
            }
        })
        if (userAlreadyExists) {
            throw new Error("O cadastrado anteriormente")
        }
        const passwordHash = await hash(senhaUsuario,8)

        const user = await prismaClient.usuario.create({
            data: {
                emailUsuario: emailUsuario,
                senhaUsuario: passwordHash,
                usuarioAtivo: false,
                papelID: papelID
            },
            select:{
                emailUsuario: true,
                usuarioAtivo: true,
                papelID: true 
            }
        })
        return user
    }

}
export { CreateUserService }
