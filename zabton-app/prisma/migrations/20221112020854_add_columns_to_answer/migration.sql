-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "hasMinted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasReceived" BOOLEAN NOT NULL DEFAULT false;
