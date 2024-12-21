-- CreateTable
CREATE TABLE "Papel" (
    "papelID" SERIAL NOT NULL,
    "nomePapel" TEXT NOT NULL,
    "descricaoPapel" TEXT NOT NULL,
    "nivelPapel" INTEGER NOT NULL,

    CONSTRAINT "Papel_pkey" PRIMARY KEY ("papelID")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioID" SERIAL NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "senhaUsuario" TEXT NOT NULL,
    "usuarioAtivo" BOOLEAN NOT NULL,
    "papelID" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioID")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "disciplinaID" SERIAL NOT NULL,
    "nomeDisciplina" TEXT NOT NULL,
    "nomeCursoDisciplina" TEXT NOT NULL,
    "nomeTurma" TEXT NOT NULL,
    "turnoTurma" TEXT NOT NULL,
    "professorID" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("disciplinaID")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "alunoID" SERIAL NOT NULL,
    "nomeAluno" TEXT NOT NULL,
    "urlGitHub" TEXT NOT NULL,
    "usuarioID" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("alunoID")
);

-- CreateTable
CREATE TABLE "Professor" (
    "professorID" SERIAL NOT NULL,
    "nomeProfessor" TEXT NOT NULL,
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professorID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_emailUsuario_key" ON "Usuario"("emailUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_professorID_key" ON "Disciplina"("professorID");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_usuarioID_key" ON "Professor"("usuarioID");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_papelID_fkey" FOREIGN KEY ("papelID") REFERENCES "Papel"("papelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor"("professorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina"("disciplinaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
