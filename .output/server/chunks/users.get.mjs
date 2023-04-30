import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const users_get = defineEventHandler(async (event) => {
  const data = await prisma.users.findMany({ orderBy: { ts: "desc" } });
  return data;
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
