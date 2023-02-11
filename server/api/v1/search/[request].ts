import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const request:string = event.context.params.request;
  const where:any = {
    OR: [
      {code_vendor: request},
      {
        name_uk: {
          contains: request,
          mode: 'insensitive',
        }
      },
      {
        name_ru: {
          contains: request,
          mode: 'insensitive',
        }
      }
    ]
  }

  try {
    const payload = await prisma.$transaction([
      prisma.items.count({
        where: where
      }),
      prisma.items.findMany({
        where: where,
        skip: 0,
        take: 19
      }),
    ]);
    const [count, items] = payload;
    prisma.$disconnect();
    return {items, count};
  } catch(err) {
    prisma.$disconnect();
    console.log(err);
    return null;
  }

  return
});