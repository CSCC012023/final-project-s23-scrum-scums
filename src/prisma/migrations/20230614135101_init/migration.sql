-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "inscribeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "parentId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("parentId","replyId")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_inscribeId_fkey" FOREIGN KEY ("inscribeId") REFERENCES "Inscribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
