import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await prisma.filters.findMany({orderBy: {name_uk: "asc"}});
  return data
});