/*
  Warnings:

  - You are about to drop the column `itemsId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `partsId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `suppliersId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_partsId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_suppliersId_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "itemsId";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "partsId",
DROP COLUMN "suppliersId",
ADD COLUMN     "cars_id" INTEGER[],
ADD COLUMN     "part_id" INTEGER,
ADD COLUMN     "supplier_id" INTEGER;
