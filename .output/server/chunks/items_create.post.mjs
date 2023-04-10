import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const items_create_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.items.createMany({
    data: body
  });
  return { response: "ok" };
});

export { items_create_post as default };
//# sourceMappingURL=items_create.post.mjs.map