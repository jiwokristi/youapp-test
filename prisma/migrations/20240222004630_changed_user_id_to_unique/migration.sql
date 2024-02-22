/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Interest" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_userId_key" ON "Interest"("userId");
