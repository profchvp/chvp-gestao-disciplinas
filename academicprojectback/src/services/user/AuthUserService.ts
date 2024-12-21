import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken"; //fazer a geração do TOKEN
import { compare } from "bcryptjs";
interface AuthRequest {
    email: string,
    password: string
}
class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        //verifica se email existe
        const user = await prismaClient.usuario.findFirst({
            where: {
                emailUsuario: email
            }
        })
        if (!user) {
            throw new Error("User/Password incorreto")
        }
        //verificar senha está correta
        const senhaOK = await compare(password, user.senhaUsuario)
        if (!senhaOK) {
            throw new Error("User/Password incorreto")
        }
        if (!user.usuarioAtivo) {
            throw new Error("Ative seu usuario")
        }
        //Se Usuario OK: gerar TOKEN para usuário
        
        const token = sign(
            {
                emailUsuario: user.emailUsuario,
                papelUsuario: user.papelID
            },
            process.env.JWT_SECRET,
            {
                subject: String(user.usuarioID),
                expiresIn:'30d'
            }
        )
        return {
            id:user.usuarioID,
            email:user.emailUsuario,
            papel:user.papelID,
            token:token
        }
    }
}
export { AuthUserService }