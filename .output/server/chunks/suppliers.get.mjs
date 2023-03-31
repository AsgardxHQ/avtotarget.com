import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const suppliers_get = defineEventHandler(async (event) => {
  const suppliers = await prisma.suppliers.findMany({ orderBy: { id: "asc" } });
  return JSON.stringify(suppliers);
});

export { suppliers_get as default };
//# sourceMappingURL=suppliers.get.mjs.map
