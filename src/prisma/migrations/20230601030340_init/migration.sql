-- CreateTable
CREATE TABLE "Inscribe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inscribe" ADD CONSTRAINT "Inscribe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
