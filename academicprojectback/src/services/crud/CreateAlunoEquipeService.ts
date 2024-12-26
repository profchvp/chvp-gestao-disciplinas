import prismaClient from '../../prisma';

interface AlunoEquipeRequest {
    alunoID: number
    equipeID: number,
    papeis: string
}

class CreateAlunoEquipeService {
    async execute({ alunoID, equipeID, papeis }: AlunoEquipeRequest) {
        if (!alunoID || !equipeID || !papeis) {
            throw new Error("Cod aluno, cod equipe e papeis: são obrigatórios");
        }


        // Verifica se anoSemestre já foi cadastrado anteriormente
        const alunoEquipeAlreadyExists = await prismaClient.alunoEquipe.findFirst({
            where: {
                alunoID: alunoID
            }
        });
        if (alunoEquipeAlreadyExists) {
            throw new Error("Aluno ja participar de uma equipe");
        }

        const AlunoEquipe = await prismaClient.alunoEquipe.create({
            data: {
                alunoID: alunoID,
                equipeID: equipeID,
                papeis: papeis
            }
        });
        return AlunoEquipe;
    }
}

export { CreateAlunoEquipeService };