import prismaClient from "../../prisma";

interface PapelUsuarioRequest {
    papelID: number;
}

class PapelUserService {
    async execute({ papelID }: PapelUsuarioRequest) {
        // Verifica se o papelID foi fornecido
        if (!papelID) {
            return {
                error: true,
                message: "O código do papel é obrigatório."
            };
        }

        // Busca o papel no banco de dados
        const papelUser = await prismaClient.papel.findFirst({
            where: {
                papelID: papelID
            },
            select: {
                nomePapel: true,
                nivelPapel: true
            }
        });

        // Verifica se o papel foi encontrado
        if (!papelUser) {
            return {
                error: true,
                message: "Papel não encontrado no banco de dados."
            };
        }

        // Retorna o papel encontrado
        return {
            error: false,
            data: papelUser
        };
    }
}

export { PapelUserService };
