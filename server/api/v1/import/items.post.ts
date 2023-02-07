import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.items.createMany({
    data: body,
    skipDuplicates: true
  });
  console.log(body[body.length-1].code_vendor);
  await prisma.$disconnect();
  return { response: 'ok' }
})