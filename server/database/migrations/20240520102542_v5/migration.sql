-- AlterTable
ALTER TABLE "copies" ADD COLUMN     "returned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
