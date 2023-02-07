-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "access_level" SMALLINT NOT NULL DEFAULT 1,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fields" JSONB,
    "ts" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "name_uk" VARCHAR(255),
    "name_ru" VARCHAR(255),
    "image" VARCHAR(255),
    "position" SMALLINT DEFAULT 0,
    "fields" JSONB,
    "itemsId" INTEGER,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255),
    "name_ru" VARCHAR(255),
    "name_uk" VARCHAR(255),
    "images" TEXT[],
    "code_wholesale" VARCHAR(255) NOT NULL,
    "code_vendor" VARCHAR(255) NOT NULL,
    "price_retail" INTEGER,
    "remains" INTEGER DEFAULT 0,
    "status" SMALLINT DEFAULT 2,
    "ts" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fields" JSONB,
    "suppliersId" INTEGER,
    "partsId" INTEGER,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "name_uk" VARCHAR(255),
    "name_ru" VARCHAR(255),
    "image" VARCHAR(255),
    "position" SMALLINT DEFAULT 0,
    "fields" JSONB,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "position" SMALLINT DEFAULT 0,
    "type" SMALLINT DEFAULT 0,
    "fields" JSONB,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_suppliersId_fkey" FOREIGN KEY ("suppliersId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
