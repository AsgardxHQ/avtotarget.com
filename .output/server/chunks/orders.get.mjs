import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const orders_get = defineEventHandler(async (event) => {
  const data = await prisma.orders.findMany({
    orderBy: { ts: "desc" }
  });
  for (let i = 0; i < data.length; i++) {
    const itemsId = Object.keys(data[i].items).map((k) => {
      return +k;
    });
    data[i]["fullItems"] = await prisma.items.findMany({
      where: {
        id: { in: itemsId }
      }
    });
  }
  return data;
});

export { orders_get as default };
//# sourceMappingURL=orders.get.mjs.map
