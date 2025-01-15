import prismaClient from '../../prisma';

interface GetAlunoEquipeRequest {
    alunoID: number
}

class GetAlunoEquipeService {
    async execute({ alunoID }: GetAlunoEquipeRequest) {
        
        const alunoEquipeAlreadyExists = await prismaClient.alunoEquipe.findFirst({
            where: {
                alunoID: alunoID
            },
            select:{
                alunoEquipeID:true,
                alunoID:true,
                equipeID:true,
                papeis:true
            }
        });

        return alunoEquipeAlreadyExists;
    }
}

export { GetAlunoEquipeService };