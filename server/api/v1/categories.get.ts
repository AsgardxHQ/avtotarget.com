import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const data = await prisma.categories.findMany({orderBy: {id: "asc"}});
  return data
});