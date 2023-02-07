import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const data = await prisma.filters.create({
    data: body
  });
  
  return data;
})