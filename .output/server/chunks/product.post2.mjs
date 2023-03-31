import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const product_post = defineEventHandler(async (event) => {
  const data = await useBody(event);
  return new Promise(async (resolve, reject) => {
    try {
      const id = data.id;
      delete data.id;
      const item = await prisma.items.update({
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

export { product_post as default };
//# sourceMappingURL=product.post2.mjs.map
