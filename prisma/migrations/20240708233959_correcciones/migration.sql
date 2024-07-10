-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_About" ("createAt", "cv", "description", "id", "image", "name", "updatedAt") SELECT "createAt", "cv", "description", "id", "image", "name", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Contact" ("createAt", "icon", "id", "name", "updatedAt", "url") SELECT "createAt", "icon", "id", "name", "updatedAt", "url" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "url" TEXT,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Experience" ("createAt", "description", "id", "image", "name", "updatedAt", "url") SELECT "createAt", "description", "id", "image", "name", "updatedAt", "url" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
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
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Project" ("company", "createAt", "description", "endDate", "github", "id", "images", "initialDate", "isFavourite", "mainImage", "name", "updatedAt", "url") SELECT "company", "createAt", "description", "endDate", "github", "id", "images", "initialDate", "isFavourite", "mainImage", "name", "updatedAt", "url" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Skill" ("createAt", "id", "image", "name", "updatedAt") SELECT "createAt", "id", "image", "name", "updatedAt" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
