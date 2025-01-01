import prismaClient from '../../prisma';

interface AlunoRequest {
    nomeAluno: string,
    registroAluno_RA: string
    urlGitHUb: string,
    usuarioID: number,
    disciplinaID: number
}

class CreateAlunoService {
    async execute({ nomeAluno, registroAluno_RA, disciplinaID, urlGitHUb, usuarioID }: AlunoRequest) {
        if (!nomeAluno || !registroAluno_RA || !disciplinaID || !urlGitHUb || !usuarioID) {
            throw new Error("nomeAluno ||registroAluno_RA|| disciplinaID || urlGitHUb || usuarioID: são obrigatórios");
        }


        // Verifica se o codigo do usuario ja foi usado para outro aluno
        const codUsuarioAlreadyExists = await prismaClient.aluno.findFirst({
            where: {
                usuarioID: usuarioID
            }
        });
        if (codUsuarioAlreadyExists) {
            throw new Error(`Ja existe usuario cadastro anteriomente para outro aluno - usuarioID: ${usuarioID}`);
        }
        // Verifica se aluno  ja foi cadastrado
        const alunoAlreadyExists = await prismaClient.aluno.findFirst({
            where: {
                registroAluno_RA: registroAluno_RA
            }
        });
        if (alunoAlreadyExists) {
            throw new Error(`Ja existe Aluno (com este RA)  cadastro anteriomente `);
        }

        const aluno = await prismaClient.aluno.create({
            data: {
                nomeAluno:nomeAluno,
                registroAluno_RA:registroAluno_RA,
                urlGitHub:urlGitHUb,
                usuarioID:usuarioID,
                disciplinaID:disciplinaID
            }
        });
        return aluno;
    }
}

export { CreateAlunoService };