/*
  Warnings:

  - You are about to drop the `_BusinessToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToOffer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BusinessToCategory" DROP CONSTRAINT "_BusinessToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToCategory" DROP CONSTRAINT "_BusinessToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOffer" DROP CONSTRAINT "_CategoryToOffer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOffer" DROP CONSTRAINT "_CategoryToOffer_B_fkey";

-- DropTable
DROP TABLE "_BusinessToCategory";

-- DropTable
DROP TABLE "_BusinessToUser";

-- DropTable
DROP TABLE "_CategoryToOffer";

-- CreateTable
CREATE TABLE "Propietario" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Propietario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferCategory" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "OfferCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Propietario" ADD CONSTRAINT "Propietario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propietario" ADD CONSTRAINT "Propietario_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCategory" ADD CONSTRAINT "BusinessCategory_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCategory" ADD CONSTRAINT "BusinessCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferCategory" ADD CONSTRAINT "OfferCategory_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferCategory" ADD CONSTRAINT "OfferCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
