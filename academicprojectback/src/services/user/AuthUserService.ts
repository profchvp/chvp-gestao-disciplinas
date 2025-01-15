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
        const user = await prismaClient.aluno.findFirst({
            where: {
                usuario: {
                    emailUsuario: email, // Filtro pelo email do usuário
                },
            },
            select: {
                alunoID:true,
                nomeAluno: true, // Recupera o nome do aluno
                usuarioID: true, // Recupera o usuarioID
                disciplinaID:true,
                registroAluno_RA:true,
                usuario: { // Relacionamento com a tabela Usuario
                    select: {
                        usuarioID: true, // ID do usuário
                        senhaUsuario:true,
                        usuarioAtivo:true,
                        emailUsuario: true, // Email do usuário
                        papelID: true, // Papel associado ao usuário
                    },
                },
            },
        });
        if (!user) {
            return {
                retorno: 200,
                message: "Usuário não encontrado/Senha inválida"
            };
        }
        //verificar senha está correta
        const senhaOK = await compare(password, user.usuario.senhaUsuario)
        if (!senhaOK) {
            return {
                retorno: 210,
                message: "Usuário não encontrado/Senha inválida"
            };
        }
        if (!user.usuario.usuarioAtivo) {
            return {
                retorno: 220,
                message: "Usuário inativo"
            };
        }
        //Se Usuario OK: gerar TOKEN para usuário
        
        const token = sign(
            {
                
                emailUsuario: user.usuario.emailUsuario,
                papelUsuario: user.usuario.papelID,
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
                idUsuario: user.usuarioID,
                alunoID:user.alunoID,
                registroAluno_ID:user.registroAluno_RA,
                nomeAluno:user.nomeAluno,
                disciplinaID:user.disciplinaID,
                email: user.usuario.emailUsuario,
                papel: user.usuario.papelID,
                token: token
        }
    }
	}
}
export { AuthUserService }