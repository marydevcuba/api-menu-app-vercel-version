/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Stars` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `reviewId` to the `Stars` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Stars` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stars" DROP CONSTRAINT "Stars_userId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Stars" ADD COLUMN     "reviewId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stars_reviewId_key" ON "Stars"("reviewId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stars" ADD CONSTRAINT "Stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stars" ADD CONSTRAINT "Stars_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
