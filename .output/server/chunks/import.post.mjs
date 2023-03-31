import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const import_post = defineEventHandler(async (event) => {
  const { updateItems } = await useBody(event);
  console.log("START IMPORT");
  await prisma.items.createMany({
    data: updateItems
  });
  console.log("END IMPORT");
  return { result: "ok" };
});

export { import_post as default };
//# sourceMappingURL=import.post.mjs.map
