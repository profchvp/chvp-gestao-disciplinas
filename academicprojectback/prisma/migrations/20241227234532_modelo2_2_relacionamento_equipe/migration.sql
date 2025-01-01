/*
  Warnings:

  - You are about to drop the column `alunoID` on the `Equipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipe" DROP COLUMN "alunoID";

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor"("professorID") ON DELETE RESTRICT ON UPDATE CASCADE;
