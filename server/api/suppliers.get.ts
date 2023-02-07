import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const suppliers = await prisma.suppliers.findMany({orderBy: {id: "asc"}});
  return JSON.stringify(suppliers)
});