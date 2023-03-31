import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const categories_get = defineEventHandler(async () => {
  const data = await prisma.categories.findMany({ orderBy: { id: "asc" } });
  return data;
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
