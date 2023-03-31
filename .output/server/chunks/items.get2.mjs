import { defineEventHandler } from 'h3';
import * as url from 'url';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const items_get = defineEventHandler(async (event) => {
  const query = url.parse(event.req.url, true).query;
  const options = {
    orderBy: { ts: "desc" }
  };
  let where = {};
  for (let key in query) {
    switch (key) {
      case "cars_id":
        where[key] = {
          hasEvery: [+query.cars_id]
        };
        break;
      case "part_id":
      case "supplier_id":
        where[key] = +query[key];
        break;
    }
  }
  options.where = where;
  if (query.page) {
    options.skip = +query.page * +query.limit;
  }
  if (query.limit)
    options.take = +query.limit;
  const payload = await prisma.$transaction([
    prisma.items.count({
      where
    }),
    prisma.items.findMany(options),
    prisma.cars.findMany()
  ]);
  const [count, items, cars] = payload;
  return { items, count, cars };
});

export { items_get as default };
//# sourceMappingURL=items.get2.mjs.map
