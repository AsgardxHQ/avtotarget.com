import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const suppliers_create_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.suppliers.createMany({
    data: body
  });
  return { response: "ok" };
});

export { suppliers_create_post as default };
//# sourceMappingURL=suppliers_create.post.mjs.map
