import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log('IMPORT request');
  await prisma.items.createMany({
    data: body
  });
  // await prisma.cars.createMany({
  //   data: body.cars
  // });
  // await prisma.parts.createMany({
  //   data: body.parts
  // });
  return JSON.stringify({result: 'ok'});
})