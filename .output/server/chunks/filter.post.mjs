import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const filter_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const data = await prisma.filters.create({
    data: body
  });
  return data;
});

export { filter_post as default };
//# sourceMappingURL=filter.post.mjs.map
