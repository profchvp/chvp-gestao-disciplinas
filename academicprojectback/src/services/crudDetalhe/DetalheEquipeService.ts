import prismaClient from "../../prisma";

interface DetalheEquipeRequest {
    equipeID: number;
}

class DetalheEquipeService {
    async execute({ equipeID }: DetalheEquipeRequest) {
        const equipe = await prismaClient.equipe.findUnique({
            where: {
                equipeID: equipeID, // Filtro pelo ID da equipe
            },
            include: {
                projeto: {
                    include: {
                        disciplina: {
                            include: {
                                professor: {
                                    select: {
                                        nomeProfessor: true, // Recupera o nome do professor
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    
        if (!equipe) {
            console.log("Equipe não encontrada.");
            return null;
        }
    
        console.log("Dados da Equipe:");
        console.log(equipe);
    
        console.log("Nome do Professor:");
        console.log(equipe.projeto.disciplina.professor.nomeProfessor);
    
         // Retorna os dados formatados
    return {
        equipeID: equipe.equipeID,
        nomeEquipe: equipe.nomeEquipe,
        alunoID: equipe.alunoID,
        temaProjeto: equipe.temaProjeto,
        descricaoProjeto: equipe.descricaoProjeto,
        gitHubEquipe: equipe.gitHubEquipe,
        projetoID: equipe.projetoID,
        nomeProfessorOrientador: equipe.projeto.disciplina.professor.nomeProfessor,
    };
    }
}

export { DetalheEquipeService };