/*
  Warnings:

  - The primary key for the `AlunoEquipe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AlunoEquipe" DROP CONSTRAINT "AlunoEquipe_pkey",
ADD COLUMN     "alunoEquipeID" SERIAL NOT NULL,
ADD COLUMN     "criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "AlunoEquipe_pkey" PRIMARY KEY ("alunoEquipeID");
