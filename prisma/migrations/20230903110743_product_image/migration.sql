-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';
