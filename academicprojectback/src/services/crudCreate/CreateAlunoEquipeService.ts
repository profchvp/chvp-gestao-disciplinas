import prismaClient from '../../prisma';

interface AlunoEquipeRequest {
    alunoID: number
    equipeID: number,
    papeis: string[],
}

class CreateAlunoEquipeService {
    async execute({ alunoID, equipeID, papeis }: AlunoEquipeRequest) {
        if (!alunoID || !equipeID || !papeis) {
            console.log(`Cod aluno, cod equipe e papeis: são obrigatórios`)
            throw new Error("Cod aluno, cod equipe e papeis: são obrigatórios");
        }


        // Verifica se anoSemestre já foi cadastrado anteriormente
        console.log(`Parâmetros recebidos - AlunoID: ${alunoID}, EquipeID: ${equipeID}, Papeis: ${papeis.join(', ')}`);
        const alunoEquipeAlreadyExists = await prismaClient.alunoEquipe.findFirst({
            where: {
                alunoID: alunoID
            }
        });
        if (alunoEquipeAlreadyExists) {
            console.log(`Aluno ja participar de uma equipe-${alunoID}`)
            throw new Error("Aluno ja participar de uma equipe");
        }
        console.log(`Criando associação - AlunoID: ${alunoID}, EquipeID: ${equipeID}, Papeis: ${papeis.join(', ')}`);
        const alunoEquipe = await prismaClient.alunoEquipe.create({
            data: {
                alunoID: alunoID,
                equipeID: equipeID,
                papeis: { set: papeis }, // Para arrays no Prisma
            }
        });
        console.log(`fez Create:...${alunoEquipe}`)
        return alunoEquipe;
    }
}

export { CreateAlunoEquipeService };