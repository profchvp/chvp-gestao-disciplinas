/*
  Warnings:

  - The `papeis` column on the `AlunoEquipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AlunoEquipe" DROP COLUMN "papeis",
ADD COLUMN     "papeis" TEXT[];
