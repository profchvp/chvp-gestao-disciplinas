/*
  Warnings:

  - Added the required column `alunoID` to the `Equipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipe" DROP CONSTRAINT "Equipe_professorID_fkey";

-- AlterTable
ALTER TABLE "Equipe" ADD COLUMN     "alunoID" INTEGER NOT NULL;
