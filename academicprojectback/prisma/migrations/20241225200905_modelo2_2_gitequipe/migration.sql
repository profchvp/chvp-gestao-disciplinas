/*
  Warnings:

  - Added the required column `gitHubEquipe` to the `Equipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipe" ADD COLUMN     "gitHubEquipe" TEXT NOT NULL;
