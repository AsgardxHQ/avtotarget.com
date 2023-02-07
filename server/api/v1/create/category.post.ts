import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const data = await prisma.categories.create({
    data: body
  });
  
  return data;
})