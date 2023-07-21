-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "embedding" vector,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
