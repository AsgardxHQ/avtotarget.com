import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const categories = await prisma.categories.findMany({orderBy: {id: "asc"}});
  const filters = await prisma.filters.findMany({orderBy: {name_uk: "asc"}});
  const items = await prisma.items.findMany({take: 20})
  return {categories, filters, items};
});