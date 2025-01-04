import prismaClient from '../../prisma';

interface GetAlunoEquipeRequest {
    alunoID: number
}

class GetAlunoEquipeService {
    async execute({ alunoID }: GetAlunoEquipeRequest) {
        
        const alunoEquipeAlreadyExists = await prismaClient.alunoEquipe.findFirst({
            where: {
                alunoID: alunoID
            }
        });

        return alunoEquipeAlreadyExists;
    }
}

export { GetAlunoEquipeService };