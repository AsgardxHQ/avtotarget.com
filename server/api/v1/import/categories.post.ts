import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const arrCats = [];
  for(let key in body) {
    arrCats.push(body[key]);
  }
  await prisma.categories.createMany({
    data: arrCats,
    skipDuplicates: true
  });
  return {result: 'ok'};
});