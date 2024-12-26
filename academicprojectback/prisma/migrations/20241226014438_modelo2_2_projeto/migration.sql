/*
  Warnings:

  - You are about to drop the column `disciplinaID` on the `Equipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipe" DROP CONSTRAINT "Equipe_disciplinaID_fkey";

-- AlterTable
ALTER TABLE "Equipe" DROP COLUMN "disciplinaID";
