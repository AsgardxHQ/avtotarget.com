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
  item.category = category;
  item.filters = filters;
  const arrayFilters = [];
  filters.map((m) => {
    arrayFilters.push(m.parent_id);
  });
  const mainFilters = await prisma.filters.findMany({
    where: {
      id: { in: arrayFilters }
    }
  });
  let mainCategory = null;
  if (category.parent_id !== 0) {
    mainCategory = await prisma.categories.findUnique({
      where: {
        id: category.parent_id
      }
    });
  }
  return { item, mainFilters, mainCategory };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
