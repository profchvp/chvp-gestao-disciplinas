import prismaClient from '../../prisma';

interface GetComposicaoEquipeRequest {
    equipeID: number
}

class GetComposicaoEquipeService {
    async execute({ equipeID }: GetComposicaoEquipeRequest) {
        
        const composicaoEquipe = await prismaClient.alunoEquipe.findMany({
            where: {
                equipeID:equipeID
            },
            select:{
            aluno: {
                select: {
                    nomeAluno: true
                }
            },
                papeis:true
            }
        });

        return composicaoEquipe.map(item => ({
            nomeAluno: item.aluno.nomeAluno,
            papeis: item.papeis
        }));;
    }
}

export { GetComposicaoEquipeService };