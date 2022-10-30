-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "contents" TEXT,
    "imagePath" TEXT,
    "type" INTEGER NOT NULL DEFAULT 1,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "themeId" INTEGER NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
