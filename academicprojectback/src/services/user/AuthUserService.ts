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
            return {
                retorno: 200,
                message: "Usuário não encontrado/Senha inválida"
            };
        }
        //verificar senha está correta
        const senhaOK = await compare(password, user.senhaUsuario)
        if (!senhaOK) {
            return {
                retorno: 210,
                message: "Usuário não encontrado/Senha inválida"
            };
        }
        if (!user.usuarioAtivo) {
            return {
                retorno: 220,
                message: "Usuário inativo"
            };
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
		
            retorno: 100,
            message: "OK",
            data: {
                id: user.usuarioID,
                email: user.emailUsuario,
                papel: user.papelID,
                token: token
        }
    }
	}
}
export { AuthUserService }