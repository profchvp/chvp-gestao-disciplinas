-- CreateTable
CREATE TABLE "PeriodoAcademico" (
    "periodoID" SERIAL NOT NULL,
    "tipoPeriodoAcademico" TEXT NOT NULL,
    "anoSemestre" TEXT NOT NULL,

    CONSTRAINT "PeriodoAcademico_pkey" PRIMARY KEY ("periodoID")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "projetoID" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "periodoAcademicoID" INTEGER NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("projetoID")
);

-- CreateTable
CREATE TABLE "CalendarioAcademico" (
    "calendarioID" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "projetoID" INTEGER NOT NULL,

    CONSTRAINT "CalendarioAcademico_pkey" PRIMARY KEY ("calendarioID")
);

-- CreateTable
CREATE TABLE "DatasCalendario" (
    "dataID" SERIAL NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "descricaoEvento" TEXT NOT NULL,
    "calendarioID" INTEGER NOT NULL,

    CONSTRAINT "DatasCalendario_pkey" PRIMARY KEY ("dataID")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "equipeID" SERIAL NOT NULL,
    "nomeEquipe" TEXT NOT NULL,
    "alunoID" INTEGER NOT NULL,
    "professorID" INTEGER NOT NULL,
    "temaProjeto" TEXT NOT NULL,
    "descricaoProjeto" TEXT NOT NULL,
    "disciplinaID" INTEGER NOT NULL,
    "projetoID" INTEGER NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("equipeID")
);

-- CreateTable
CREATE TABLE "AlunoEquipe" (
    "alunoID" INTEGER NOT NULL,
    "equipeID" INTEGER NOT NULL,

    CONSTRAINT "AlunoEquipe_pkey" PRIMARY KEY ("alunoID","equipeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "CalendarioAcademico_projetoID_key" ON "CalendarioAcademico"("projetoID");

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_periodoAcademicoID_fkey" FOREIGN KEY ("periodoAcademicoID") REFERENCES "PeriodoAcademico"("periodoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarioAcademico" ADD CONSTRAINT "CalendarioAcademico_projetoID_fkey" FOREIGN KEY ("projetoID") REFERENCES "Projeto"("projetoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatasCalendario" ADD CONSTRAINT "DatasCalendario_calendarioID_fkey" FOREIGN KEY ("calendarioID") REFERENCES "CalendarioAcademico"("calendarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina"("disciplinaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_projetoID_fkey" FOREIGN KEY ("projetoID") REFERENCES "Projeto"("projetoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoEquipe" ADD CONSTRAINT "AlunoEquipe_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Aluno"("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoEquipe" ADD CONSTRAINT "AlunoEquipe_equipeID_fkey" FOREIGN KEY ("equipeID") REFERENCES "Equipe"("equipeID") ON DELETE RESTRICT ON UPDATE CASCADE;
