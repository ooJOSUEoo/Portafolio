/*
  Warnings:

  - You are about to drop the column `for` on the `Project` table. All the data in the column will be lost.
  - Added the required column `company` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "url" TEXT,
    "github" TEXT,
    "company" TEXT NOT NULL,
    "initialDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "isFavourite" BOOLEAN,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createAt", "description", "endDate", "github", "id", "images", "initialDate", "isFavourite", "mainImage", "name", "updatedAt", "url") SELECT "createAt", "description", "endDate", "github", "id", "images", "initialDate", "isFavourite", "mainImage", "name", "updatedAt", "url" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
