import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const _request_ = defineEventHandler(async (event) => {
  const request = event.context.params.request;
  const where = {
    OR: [
      { code_vendor: request },
      {
        name_uk: {
          contains: request,
          mode: "insensitive"
        }
      },
      {
        name_ru: {
          contains: request,
          mode: "insensitive"
        }
      }
    ]
  };
  try {
    const payload = await prisma.$transaction([
      prisma.items.count({
        where
      }),
      prisma.items.findMany({
        where,
        skip: 0,
        take: 19
      })
    ]);
    const [count, items] = payload;
    prisma.$disconnect();
    return { items, count };
  } catch (err) {
    prisma.$disconnect();
    console.log(err);
    return null;
  }
  return;
});

export { _request_ as default };
//# sourceMappingURL=_request_.mjs.map
