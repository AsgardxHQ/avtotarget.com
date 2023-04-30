import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const filters_get = defineEventHandler(async (event) => {
  const data = await prisma.filters.findMany({ orderBy: { name_uk: "asc" } });
  return data;
});

export { filters_get as default };
//# sourceMappingURL=filters.get.mjs.map
