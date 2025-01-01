/*
  Warnings:

  - A unique constraint covering the columns `[registroAluno_RA]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registroAluno_RA` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "registroAluno_RA" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_registroAluno_RA_key" ON "Aluno"("registroAluno_RA");
