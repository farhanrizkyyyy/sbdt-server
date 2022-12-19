/*
  Warnings:

  - You are about to drop the column `coordinate` on the `Post` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "coordinate",
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;
