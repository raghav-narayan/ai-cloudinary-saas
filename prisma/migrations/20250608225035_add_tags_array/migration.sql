-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
