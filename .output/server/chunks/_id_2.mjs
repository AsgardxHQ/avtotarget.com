import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const _id_ = defineEventHandler(async (event) => {
  const id = +event.context.params.id;
  const item = await prisma.items.findUnique({
    where: { id }
  });
  const category = await prisma.categories.findUnique({
    where: {
      id: item.category_id
    }
  });
  const filters = await prisma.filters.findMany({
    where: {
      id: { in: item.filters_id }
    }
  });
  console.log(category, filters);
  item.category = category;
  item.filters = filters;
  return item;
});

export { _id_ as default };
//# sourceMappingURL=_id_2.mjs.map
