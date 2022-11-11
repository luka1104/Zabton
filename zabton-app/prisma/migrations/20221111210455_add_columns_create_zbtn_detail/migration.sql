/*
  Warnings:

  - You are about to drop the column `lifeLeft` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lifeLimit` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lifeLeft",
DROP COLUMN "lifeLimit",
ADD COLUMN     "answerLeft" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "answerLimit" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "themeLeft" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "themeLimit" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "validateLeft" INTEGER NOT NULL DEFAULT 6,
ADD COLUMN     "validateLimit" INTEGER NOT NULL DEFAULT 6;

-- CreateTable
CREATE TABLE "zbtnDetail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contents" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL,

    CONSTRAINT "zbtnDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zbtnDetail" ADD CONSTRAINT "zbtnDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
