import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createUser_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.users.create({
    data: body
  });
  return { response: "ok" };
});

export { createUser_post as default };
//# sourceMappingURL=createUser.post.mjs.map
