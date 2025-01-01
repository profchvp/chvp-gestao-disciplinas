import prismaClient from '../../prisma';

interface ProjetoRequest {
    descricao: string;
    periodoAcademicoID: number;
    disciplinaID: number
}

class CreateProjetoService {
    async execute({ descricao, periodoAcademicoID, disciplinaID}: ProjetoRequest) {
        if (!descricao || !periodoAcademicoID || !disciplinaID ) {
            throw new Error("!descricao || !periodoAcademicoID || disciplinaID || : são obrigatórios");
        }




        // Verifica se anoSemestre já foi cadastrado anteriormente
        const anoSemestreAlreadyExists = await prismaClient.projeto.findFirst({
            where: {
                periodoAcademicoID: periodoAcademicoID,
                disciplinaID: disciplinaID
            }
        });
        if (anoSemestreAlreadyExists) {
            throw new Error("Já existe um cadastro para este período/disciplina deste projeto");
        }

        const Projeto = await prismaClient.projeto.create({
            data: {
                descricao: descricao,
                periodoAcademicoID: periodoAcademicoID,
                disciplinaID: disciplinaID,
                
            }
        });
        return Projeto;
    }
}

export { CreateProjetoService };