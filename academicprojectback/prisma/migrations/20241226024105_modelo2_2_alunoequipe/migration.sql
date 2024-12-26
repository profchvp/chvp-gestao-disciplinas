/*
  Warnings:

  - Added the required column `papeis` to the `AlunoEquipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlunoEquipe" ADD COLUMN     "papeis" TEXT NOT NULL;
