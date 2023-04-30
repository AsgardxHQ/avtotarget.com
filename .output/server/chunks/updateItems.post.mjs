import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const updateItems_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.$transaction(
    body.map(
      (item) => prisma.items.upsert({
        where: { id: item.id },
        update: {
          carsId: item.carsId,
          suppliersId: item.suppliersId,
          partsId: item.partsId
        },
        create: item
      })
    )
  );
  return { response: "ok" };
});

export { updateItems_post as default };
//# sourceMappingURL=updateItems.post.mjs.map
