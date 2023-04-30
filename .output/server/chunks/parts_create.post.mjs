import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const parts_create_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.parts.createMany({
    data: body
  });
  return { response: "ok" };
});

export { parts_create_post as default };
//# sourceMappingURL=parts_create.post.mjs.map
