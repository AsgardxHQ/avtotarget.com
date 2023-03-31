import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const category_post = defineEventHandler(async (event) => {
  const data = await useBody(event);
  return new Promise(async (resolve, reject) => {
    try {
      const id = data.id;
      delete data.id;
      const item = await prisma.categories.update({
        where: {
          id
        },
        data
      });
      resolve(item);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
});

export { category_post as default };
//# sourceMappingURL=category.post.mjs.map
