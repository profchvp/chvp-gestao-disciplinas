import prismaClient from "../../prisma";
class ListEquipesService {
    async execute() {
        const equipes = await prismaClient.equipe.findMany({
            select: {
                equipeID: true,
                temaProjeto: true
            },
            orderBy:{
                temaProjeto:'asc'
            }
        })
        return equipes;
    }
}
export { ListEquipesService }