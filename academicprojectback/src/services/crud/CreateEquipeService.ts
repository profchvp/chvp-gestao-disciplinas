import prismaClient from '../../prisma';

interface EquipeRequest {
    nomeEquipe: string;
    alunoID: number;
    professorID: number;
    temaProjeto: string;
    descricaoProjeto: string;
    gitHubEquipe: string;
    projetoID: number
}

class CreateEquipeService {
    async execute({ nomeEquipe, alunoID, professorID, temaProjeto, descricaoProjeto, projetoID, gitHubEquipe }: EquipeRequest) {
        if (!nomeEquipe || !alunoID || !professorID || !temaProjeto || !descricaoProjeto || !projetoID || !gitHubEquipe) {
            throw new Error("nomeEquipe || alunoID || professorID || temaProjeto || descricaoProjeto || projetoID || gitHubEquipe : são obrigatórios");
        }




        // Verifica se anoSemestre já foi cadastrado anteriormente
        const equipeAlreadyExists = await prismaClient.equipe.findFirst({
            where: {
                nomeEquipe: nomeEquipe
            }
        });
        if (equipeAlreadyExists) {
            throw new Error("Já existe um cadastro para esta Equipe");
        }

        const Equipe = await prismaClient.equipe.create({
            data: {
                nomeEquipe: nomeEquipe,
                alunoID: alunoID,
                professorID: professorID,
                temaProjeto: temaProjeto,
                descricaoProjeto: descricaoProjeto,
                projetoID: projetoID, // Certifique-se de passar o ID do projeto correto aqui
                gitHubEquipe: gitHubEquipe
            }
        });
        return Equipe;
    }
}

export { CreateEquipeService };