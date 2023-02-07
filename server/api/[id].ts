import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = +event.context.params.id
  const item:any = await prisma.items.findUnique({
    where: {id: id},
  });
  const category = await prisma.categories.findUnique({
    where: {
      id: item.category_id
    }
  });
  const filters = await prisma.filters.findMany({
    where: {
      id: { in: item.filters_id}
    }
  });
  console.log(category, filters);
  item.category = category;
  item.filters = filters;
  return item;
})