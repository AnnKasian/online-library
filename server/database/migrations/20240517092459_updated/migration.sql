/*
  Warnings:

  - Added the required column `updated_at` to the `authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `copies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `genres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "copies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
