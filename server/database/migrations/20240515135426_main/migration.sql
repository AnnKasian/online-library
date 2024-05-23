/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `genres` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authors_full_name_key" ON "authors"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_type_key" ON "genres"("type");
