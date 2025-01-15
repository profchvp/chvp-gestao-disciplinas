import prismaClient from '../../prisma';

interface GetEquipeRequest {
    equipeID: number
}

class GetEquipeService {
    async execute({ equipeID }: GetEquipeRequest) {

        const equipeDetalhe = await prismaClient.equipe.findFirst({
            where: {
                equipeID: equipeID
            },
            select: {
                nomeEquipe: true,
                alunoID: true,
                professorID: true,
                temaProjeto: true,
                descricaoProjeto: true,
                gitHubEquipe: true,
            }
        });

        const nomeAluno = await prismaClient.aluno.findFirst({
            where: {
                alunoID: equipeDetalhe.alunoID
            },
            select: {
                nomeAluno: true
            }
        });
        const nomeProfessor = await prismaClient.professor.findFirst({
            where: {
                professorID: equipeDetalhe.professorID
            },
            select: {
                nomeProfessor: true
            }
        });
        return {
            "nomeEquipe": equipeDetalhe.nomeEquipe,
            "temaProjeto": equipeDetalhe.temaProjeto,
            "descricaoProjeto": equipeDetalhe.descricaoProjeto,
            "gitHubEquipe":equipeDetalhe.gitHubEquipe,
            "alunoGerente":nomeAluno.nomeAluno,
            "nomeProfessorOrientador":nomeProfessor.nomeProfessor
        };
    }
}

export { GetEquipeService };