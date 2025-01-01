import prismaClient from '../../prisma';

interface DisciplinaRequest {
    nomeDisciplina: string;
    nomeCursoDisciplina: string;
    nomeTurma: string,
    turnoTurma: string //matutino;Vespertino;Noturno
    professorID: number
}

class CreateDisciplinaService {
    async execute({ nomeDisciplina, nomeCursoDisciplina, nomeTurma, turnoTurma, professorID }: DisciplinaRequest) {
        if (!nomeDisciplina|| !nomeCursoDisciplina|| !nomeTurma|| !turnoTurma|| !professorID) {
            throw new Error("nomeDisciplina, nomeCursoDisciplina, nomeTurma, turnoTurma, professorID: são obrigatórios");
        }

        
        // Validação do do turno da disciplina
       // Validação do turnoTurma
       if (!['Matutino', 'Vespertino', 'Noturno'].includes(turnoTurma)) {
        throw new Error("Turno da Turma inválido. Deve ser 'Matutino', 'Vespertino' ou 'Noturno'.");
    }

        

        // Verifica se anoSemestre já foi cadastrado anteriormente
        const anoSemestreAlreadyExists = await prismaClient.disciplina.findFirst({
            where: {
                nomeTurma: nomeTurma
            }
        });
        if (anoSemestreAlreadyExists) {
            throw new Error("Já existe um cadastro para esta turma");
        }

        const Disciplina = await prismaClient.disciplina.create({
            data: {
                nomeDisciplina:nomeDisciplina,
                nomeCursoDisciplina:nomeCursoDisciplina,
                nomeTurma:nomeTurma,
                turnoTurma:turnoTurma,
                professorID:professorID
            }
        });
        return Disciplina;
    }
}

export { CreateDisciplinaService };