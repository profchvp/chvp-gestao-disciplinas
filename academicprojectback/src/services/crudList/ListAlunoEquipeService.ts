import prismaClient from "../../prisma";
class ListAlunoEquipeService {
    async execute() {
        const equipes = await prismaClient.alunoEquipe.findMany({
            
            orderBy:{
                alunoID:'asc'
            }
        })
        return equipes;
    }
}
export { ListAlunoEquipeService }