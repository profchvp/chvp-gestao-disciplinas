import prismaClient from '../../prisma';

interface PeriodoAcademicoRequest {
    tipoPeriodoAcademico: string; // S=Semestral; A=Anual; O=Outros
    anoSemestre: string;
}

class CreatePeriodoAcademicoService {
    async execute({ tipoPeriodoAcademico, anoSemestre }: PeriodoAcademicoRequest) {
        if (!tipoPeriodoAcademico || !anoSemestre) {
            throw new Error("Tipo de Período Acadêmico e Ano/Semestre são obrigatórios");
        }

        // Transformar tipoPeriodoAcademico para maiúsculas
        tipoPeriodoAcademico = tipoPeriodoAcademico.toUpperCase();

        // Validação do tipoPeriodoAcademico
        if (!['S', 'A', 'O'].includes(tipoPeriodoAcademico)) {
            throw new Error("Tipo de Período Acadêmico inválido. Deve ser 'S', 'A' ou 'O'.");
        }

        // Validação do formato de anoSemestre
        const regex = /^(202[5-9]|20[3-9]\d|2[1-9]\d{2})-(0|1|2)$/;
        if (!regex.test(anoSemestre)) {
            throw new Error("Formato de Ano/Semestre inválido. Deve ser 'AAAA-X', onde 'AAAA' é um ano >= 2025 e 'X' é 0, 1 ou 2.");
        }

        // Verifica se anoSemestre já foi cadastrado anteriormente
        const anoSemestreAlreadyExists = await prismaClient.periodoAcademico.findFirst({
            where: {
                tipoPeriodoAcademico: tipoPeriodoAcademico,
                anoSemestre: anoSemestre
            }
        });
        if (anoSemestreAlreadyExists) {
            throw new Error("Já existe um cadastro para este período");
        }

        const periodoAcademico = await prismaClient.periodoAcademico.create({
            data: {
                tipoPeriodoAcademico: tipoPeriodoAcademico,
                anoSemestre: anoSemestre
            }
        });
        return periodoAcademico;
    }
}

export { CreatePeriodoAcademicoService };