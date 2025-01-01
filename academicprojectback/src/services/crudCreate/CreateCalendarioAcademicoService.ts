import prismaClient from '../../prisma';

interface CalendarioAcademicoRequest {
    projetoID: number
    descricao: string
}

class CreateCalendarioAcademicoService {
    async execute({ projetoID, descricao }: CalendarioAcademicoRequest) {
        if (!projetoID || !descricao) {
            throw new Error("Cod Projeto e descricao: são obrigatórios");
        }


        // Verifica se calendario já foi cadastrado anteriormente
        const calendarioAcademicoAlreadyExists = await prismaClient.calendarioAcademico.findFirst({
            where: {
                projetoID: projetoID
            }
        });
        if (calendarioAcademicoAlreadyExists) {
            throw new Error("Calendario cadastrado anteriormente para o projeto requerido");
        }

        const calendarioAcademico = await prismaClient.calendarioAcademico.create({
            data: {
                projetoID: projetoID,
                descricao: descricao
            }
        });
        return calendarioAcademico;
    }
}

export { CreateCalendarioAcademicoService };