import prismaClient from '../../prisma';

interface GetDatasProjetoRequest {
    equipeID: number
}

class GetDatasProjetoService {
    async execute({ equipeID }: GetDatasProjetoRequest) {
        console.log(`EquipeID para acesso a Datasprojeto:${equipeID}`)
        try {
            const datasCalendario = await prismaClient.datasCalendario.findMany({
              where: {
                calendarioAcademico: {
                  projeto: {
                    equipes: {
                      some: {
                        equipeID: equipeID,
                      },
                    },
                  },
                },
              },
              select: {
                dataEvento: true,
                descricaoEvento: true,
              },
              orderBy: {
                dataEvento: 'asc',
              },
            });
        
            return datasCalendario;
          } catch (error) {
            console.error(error);
          } finally {
            await prismaClient.$disconnect();
          }
    }
}

export { GetDatasProjetoService };