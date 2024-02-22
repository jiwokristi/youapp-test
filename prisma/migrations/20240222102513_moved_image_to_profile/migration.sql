/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `Interest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Interest_userId_key";

-- AlterTable
ALTER TABLE "Interest" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
