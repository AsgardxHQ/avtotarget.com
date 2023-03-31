import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const categories_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const arrCats = [];
  for (let key in body) {
    arrCats.push(body[key]);
  }
  await prisma.categories.createMany({
    data: arrCats,
    skipDuplicates: true
  });
  return { result: "ok" };
});

export { categories_post as default };
//# sourceMappingURL=categories.post.mjs.map
