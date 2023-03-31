import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const items_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.items.createMany({
    data: body,
    skipDuplicates: true
  });
  console.log(body[body.length - 1].code_vendor);
  await prisma.$disconnect();
  return { response: "ok" };
});

export { items_post as default };
//# sourceMappingURL=items.post.mjs.map
