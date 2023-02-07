import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const cars = await prisma.cars.findMany({
    orderBy: {id:'desc'}
  });
  return JSON.stringify(cars);
})