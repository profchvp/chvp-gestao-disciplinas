import prismaClient from '../../prisma';

interface DatasCalendarioRequest {
    dataEvento: string,
    descricaoEvento: string,
    calendarioID: number
}

class CreateDatasCalendarioService {
    async execute({ dataEvento,descricaoEvento,calendarioID}: DatasCalendarioRequest) {
        if (!dataEvento || !descricaoEvento || !calendarioID) {
            throw new Error("dataEvento || descricaoEvento || calendarioID: são obrigatórios");
        }


        // Verifica se anoSemestre já foi cadastrado anteriormente
        //const datasCalendarioAlreadyExists = await prismaClient.datasCalendario.findFirst({
        //    where: {
        //        dataEvento: dataEvento
        //    }
        //});
        //if (datasCalendarioAlreadyExists) {
        //    throw new Error("Ja existe evento para a data");
       // }

        const DatasCalendario = await prismaClient.datasCalendario.create({
            data: {
                dataEvento: dataEvento,
                descricaoEvento: descricaoEvento,
                calendarioID: calendarioID
            }
        });
        return DatasCalendario;
    }
}

export { CreateDatasCalendarioService };