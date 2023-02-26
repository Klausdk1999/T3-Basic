/*
  Warnings:

  - A unique constraint covering the columns `[adminEmail]` on the table `License` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminEmail` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "License" ADD COLUMN     "adminEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "RoleEnumType" DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "License_adminEmail_key" ON "License"("adminEmail");
