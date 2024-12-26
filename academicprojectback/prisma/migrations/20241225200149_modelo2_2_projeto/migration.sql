/*
  Warnings:

  - Added the required column `disciplinaID` to the `Projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "disciplinaID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina"("disciplinaID") ON DELETE RESTRICT ON UPDATE CASCADE;
