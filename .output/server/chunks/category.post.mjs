import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const category_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const data = await prisma.categories.create({
    data: body
  });
  return data;
});

export { category_post as default };
//# sourceMappingURL=category.post.mjs.map
