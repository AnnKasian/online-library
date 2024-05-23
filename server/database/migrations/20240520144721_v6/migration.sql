-- DropForeignKey
ALTER TABLE "copies" DROP CONSTRAINT "copies_user_id_fkey";

-- AlterTable
ALTER TABLE "copies" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "copies" ADD CONSTRAINT "copies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
